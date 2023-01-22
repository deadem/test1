import './chat-list.scss';
import { default as template } from './chat-list.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatList extends Block<Props> {
  protected template = template;
}
