import { api } from './API';
import { HTTPTransport } from '../utils/HTTPTransport';

export class Controller {
  private readonly api: string;
  private httpTransport?: HTTPTransport;

  constructor(path: string) {
    this.api = `${api}${path}`;
  }

  protected transport() {
    if (!this.httpTransport) {
      this.httpTransport = new HTTPTransport(this.api);
    }

    return this.httpTransport;
  }
}
