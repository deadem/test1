import './chat-item.scss';
import { default as template } from './chat-item.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatItem extends Block<Props> {
  protected template = template;
}
