type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type DataObject = { [keys in string | number ]: string | number | undefined };
type Data = DataObject | FormData | string | number | undefined;

type Options = {
  headers?: { [key: string]: string },
  data?: Data;
  timeout?: number;
  withCredentials?: boolean | undefined;
  responseType?: XMLHttpRequestResponseType;
  signal?: AbortSignal;
}

class AbortSignal {
  public handler: () => void = () => undefined;
}

export class AbortController {
  public readonly signal = new AbortSignal();
  public abort() {
    this.signal.handler();
  }
}

function queryString(data: Record<string | number, string | number | undefined>) {
  return Object.entries(data)
    .filter((entry): entry is [ string, string | number ] => entry[1] != undefined)
    .map(([ name, value ]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
    .join('&');
}

export class HTTPTransport {
  private readonly prefix: string;

  constructor(prefix = '') {
    this.prefix = prefix;
  }

  public get(urlPart: string, { data, ...options }: Omit<Options, 'data'> & { data?: DataObject } = {}) {
    if (data && Object.keys(data).length) {
      const queryPart = queryString(data);
      if (queryPart) {
        urlPart += '?' + queryPart;
      }
    }

    return this.request(urlPart, 'GET', options);
  }

  public put(urlPart: string, options: Options = {}) {
    return this.request(urlPart, 'PUT', options);
  }

  public post(urlPart: string, options: Options = {}) {
    return this.request(urlPart, 'POST', options);
  }

  public delete(urlPart: string, options: Options = {}) {
    return this.request(urlPart, 'DELETE', options);
  }

  private request<Response>(urlPart: string, method: Method, options: Options = {}): Promise<Response> {
    // 60 секунд умолчательный таймаут
    const { data, headers, signal, timeout = 60000, withCredentials = true, responseType = 'json' } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.prefix}${urlPart}`);

      if (signal) {
        signal.handler = () => { xhr.abort(); };
      }

      xhr.onload = () => { resolve(xhr.response); };
      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      Object.entries(headers ?? {}).forEach(([ key, value ]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

/*
Модуль пока что в проекте не используется, тут в комментарии хоть какой-то пример, как его вызывать:

const req = new HTTPTransport();
req.get('https://ya-praktikum.tech/api/v2/auth/user', { data: { q: 'te?1=&st' } }).then(e => {
  console.log(e);
}).catch(e => {
  console.error(e);
});
*/
