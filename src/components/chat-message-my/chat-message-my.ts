import './chat-message-my.scss';
import { default as template } from './chat-message-my.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatMessageMy extends Block<Props> {
  protected template = template;
}
