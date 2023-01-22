import './chat-message-image.scss';
import { default as template } from './chat-message-image.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatMessageImage extends Block<Props> {
  protected template = template;
}
