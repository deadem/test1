import { APIMessageData } from '../controllers/API';
import { EventBus } from './EventBus';

export const enum WSTransportEvents {
  Connected,
  Error,
  Message,
  Close,
}

type EventTypes = {
  [WSTransportEvents.Message]: [ APIMessageData | APIMessageData[] ];
  [WSTransportEvents.Error]: [ unknown ];
  [WSTransportEvents.Connected]: [ void ];
  [WSTransportEvents.Close]: [ void ] ;
}

export class WSTransport extends EventBus<EventTypes> {
  private socket?: WebSocket;
  private pingInterval?: ReturnType<typeof setInterval>;
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject);
      this.on(WSTransportEvents.Connected, () => {
        this.off(WSTransportEvents.Error, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (data?.type == 'pong' || data?.type == 'user connected') {
        return;
      }
      this.emit(WSTransportEvents.Message, data);
    });
  }
}
