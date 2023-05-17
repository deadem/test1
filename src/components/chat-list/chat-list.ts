import './chat-list.scss';
import template from './chat-list.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatList extends Block<Props> {
  static componentName = 'ChatList';
  protected template = template;
}
