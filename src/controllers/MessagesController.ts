import { staticStore, updateStore } from '../utils/Store';
import { Store } from '../utils/StoreInterface';
import { WSTransport, WSTransportEvents } from '../utils/WSTransport';
import { APIMessageData, webSocketAPI } from './API';
import { Controller } from './Controller';

export class MessagesController extends Controller {
  private chatId?: number;
  private wsTransport?: WSTransport;

  constructor() {
    super('/chats');
  }

  public connect(id: number) {
    if (this.chatId == id) {
      // Не подключаем второй раз тот же чат
      return;
    }
    this.chatId = id;
    this.wsTransport?.close();

    this.transport().post<{ token: string}>(`/token/${this.chatId}`).then(({ token }) => {
      const store = staticStore();
      this.wsTransport = new WSTransport(`${webSocketAPI}${store.userId}/${this.chatId}/${token}`);
      this.wsTransport.on(WSTransportEvents.Message, this.receiveMessages.bind(this));
      return this.wsTransport.connect();
    }).then(() => {
      this.wsTransport?.send({ content: '0', type: 'get old' });
    }).catch((e) => {
      // Пока что никак не обрабыватываем сообщения об ошибках
      console.error(e);
    });
  }

  public disconnect() {
    this.wsTransport?.close();
    this.wsTransport = undefined;
  }

  public addMessage(message: string) {
    this.wsTransport?.send({ content: message, type: 'message' });
  }

  private receiveMessages(data: APIMessageData | APIMessageData[]) {
    const convert = (message: APIMessageData) => ({
      message: message.content,
      time: new Date(message.time),
      textTime: new Date(message.time).toLocaleString(),
      userId: message.user_id,
    });

    const store = staticStore();

    const messages = Array.isArray(data)
      ? data.map(message => convert(message))
      : [ ...store.messages as Store['messages'], convert(data) ];

    messages.sort((a, b) => a.time.getTime() - b.time.getTime());

    // обновим последнюю запись у текущего чата:
    const chats = [ ...store.chats as Store['chats'] ];
    const chat = chats.find((chat) => chat.id == store.currentChat);
    if (chat && messages.length) {
      const message = messages[messages.length - 1];
      chat.time = message.time;
      chat.message = message.message;
    }

    updateStore({ messages, chats });
  }
}
