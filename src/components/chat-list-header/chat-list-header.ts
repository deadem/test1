import './chat-list-header.scss';
import { default as template } from './chat-list-header.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatListHeader extends Block<Props> {
  protected template = template;
}
