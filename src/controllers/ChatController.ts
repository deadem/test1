import { staticStore, updateStore } from '../utils/Store';
import { APIChatsData } from './API';
import { Controller } from './Controller';

export class ChatController extends Controller {
  constructor() {
    super('/chats');
  }

  public initChats() {
    if (staticStore().loading?.chats) {
      // Если данные по чатам уже загружаются - ничего не делаем
      return;
    }

    updateStore({ loading: { ...staticStore().loading, chats: true } });

    this.transport().get<APIChatsData>('').then(data => {
      const chats = data.map(chat => ({
        id: chat.id,
        name: chat.title,
        avatar: chat.avatar,
        unread: chat.unread_count,
        message: chat.last_message.content,
        time: new Date(chat.last_message.time),
      }));

      updateStore({ chats });
    });
  }
}
