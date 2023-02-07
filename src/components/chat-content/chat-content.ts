import './chat-content.scss';
import template from './chat-content.hbs?raw';
import { Block } from '../../utils/Block';
import { message } from './chat-content-stub';

interface Props {
}

export class ChatContent extends Block<Props> {
  static componentName = 'ChatContent';
  protected template = template;

  constructor() {
    super(message);
  }
}
