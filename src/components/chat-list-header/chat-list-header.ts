import './chat-list-header.scss';
import template from './chat-list-header.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo } from '../../utils/Navigation';

interface Props {
}

type Refs = {
  profile: HTMLElement;
}

export class ChatListHeader extends Block<Props, Refs> {
  static componentName = 'ChatListHeader';
  protected template = template;
  protected override events = {
    profile: {
      click: () => NavigateTo.profile(),
    }
  };
}
