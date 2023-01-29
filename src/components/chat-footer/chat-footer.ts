import './chat-footer.scss';
import template from './chat-footer.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatFooter extends Block<Props> {
  static componentName = 'ChatFooter';
  protected template = template;
}
