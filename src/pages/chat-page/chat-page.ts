import './chat-page.scss';
import template from './chat-page.hbs?raw';
import { Block } from '../../utils/Block';
import { ChatController } from '../../controllers/ChatController';

interface Props {
}

export class ChatPage extends Block<Props> {
  static componentName = 'ChatPage';
  protected template = template;

  constructor() {
    super({});

    new ChatController().request();
  }
}
