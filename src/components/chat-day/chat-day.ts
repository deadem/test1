import './chat-day.scss';
import { default as template } from './chat-day.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatDay extends Block<Props> {
  protected template = template;
}
