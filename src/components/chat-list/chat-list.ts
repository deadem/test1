import './chat-list.scss';
import template from './chat-list.hbs?raw';
import { Block } from '../../utils/Block';
import { updateStore, withStore, WithStoreProps } from '../../utils/Store';
import { chatList } from './chat-list-stub';

type Props = WithStoreProps & {
  // empty
};

// Временная затычка, для демонстрации списка чатов и переключения между ними
updateStore({
  currentChat: 5,
  chats: chatList,
  loading: { chats: true }
});

@withStore
export class ChatList extends Block<Props> {
  static componentName = 'ChatList';
  protected template = template;
}
