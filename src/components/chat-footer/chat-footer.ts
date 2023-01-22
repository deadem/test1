import './chat-footer.scss';
import { default as template } from './chat-footer.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatFooter extends Block<Props> {
  protected template = template;
}
