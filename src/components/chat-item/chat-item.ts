import './chat-item.scss';
import template from './chat-item.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatItem extends Block<Props> {
  static componentName = 'ChatItem';
  protected template = template;
}
