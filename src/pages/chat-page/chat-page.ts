import './chat-page.scss';
import template from './chat-page.hbs?raw';
import { Block } from '../../utils/Block';
import { chatList } from './chat-page-stub';

interface Props {
}

export class ChatPage extends Block<Props> {
  static componentName = 'ChatPage';
  protected template = template;

  constructor() {
    super({ chatList });
  }
}
