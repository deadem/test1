type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type DataObject = { [keys in string | number ]: string | number | undefined };
type Data = DataObject | FormData | string | number | undefined;

type Options = {
  headers?: { [key: string]: string },
  data?: Data;
  timeout?: number;
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
  public get(url: string, { data, ...options }: Omit<Options, 'data'> & { data?: DataObject } = {}) {
    if (data && Object.keys(data).length) {
      const queryPart = queryString(data);
      if (queryPart) {
        url += '?' + queryPart;
      }
    }

    return this.request(url, 'GET', options);
  }

  public put(url: string, options: Options = {}) {
    return this.request(url, 'PUT', options);
  }

  public post(url: string, options: Options = {}) {
    return this.request(url, 'POST', options);
  }

  public delete(url: string, options: Options = {}) {
    return this.request(url, 'DELETE', options);
  }

  private request<Response>(url: string, method: Method, options: Options = {}): Promise<Response> {
    const { data, headers, timeout, signal } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.timeout = timeout ?? 60000; // 60 секунд умолчательный таймаут
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

      xhr.withCredentials = true;
      xhr.responseType = 'json';

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
const req = new HTTPTransport();
req.get('https://ya-praktikum.tech/api/v2/auth/user', { data: { q: 'te?1=&st' } }).then(e => {
  console.log(e);
}).catch(e => {
  console.error(e);
});
*/
