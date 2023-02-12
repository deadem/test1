import './chat-list-header.scss';
import template from './chat-list-header.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo } from '../../utils/Navigation';
import { ChatController } from '../../controllers/ChatController';

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
    },
    button: {
      click: () => this.setProps({ addChat: true }),
    }
  };

  protected override customProps() {
    return {
      ...super.customProps(),
      onAddChat: (props: { value: string }) => this.addChat(props.value),
    };
  }

  private addChat(value: string) {
    new ChatController().addChat(value);
  }
}
