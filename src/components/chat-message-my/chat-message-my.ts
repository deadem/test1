import './chat-message-my.scss';
import template from './chat-message-my.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatMessageMy extends Block<Props> {
  static componentName = 'ChatMessageMy';
  protected template = template;
}
