import './chat-message.scss';
import { default as template } from './chat-message.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatMessage extends Block<Props> {
  protected template = template;
}
