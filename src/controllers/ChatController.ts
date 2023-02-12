import { staticStore, updateStore } from '../utils/Store';
import { APIChatsData } from './API';
import { Controller } from './Controller';

export class ChatController extends Controller {
  constructor() {
    super('/chats');
  }

  public request() {
    if (staticStore().loading?.chats) {
      // Если данные по чатам уже загружаются - ничего не делаем
      return;
    }

    updateStore({ loading: { ...staticStore().loading, chats: true } });
    const currentChat = staticStore().currentChat;
    this.fetchList().then(chats => updateStore({ currentChat: currentChat || chats[0]?.id || 0, chats }));
  }

  public addChat(name: string) {
    return this.transport().post<{ id: number }>('', { data: { title: name } }).then(data => {
      return Promise.all([ data.id, this.fetchList() ]);
    }).then(([ currentChat, chats ]) => {
      updateStore({ currentChat, chats });
    });
  }

  public addUser(chatId: number, userId: number) {
    return this.transport().put('/users', { data: { users: [ userId ], chatId } });
  }

  private fetchList() {
    return this.transport().get<APIChatsData>('').then(data => {
      return data.map(chat => ({
        id: chat.id,
        name: chat.title,
        avatar: chat.avatar,
        unread: chat.unread_count,
        message: chat.last_message?.content,
        time: chat.last_message ? new Date(chat.last_message.time) : undefined,
      }));
    });
  }
}
