import './chat-header.scss';
import plus from '../../assets/plus_icon.svg';
import cross from '../../assets/cross_icon.svg';
import template from './chat-header.hbs?raw';
import { Block } from '../../utils/Block';
import { withStore, WithStoreProps } from '../../utils/Store';
import { UserController } from '../../controllers/UserController';
import { ChatController } from '../../controllers/ChatController';

type Props = WithStoreProps & {
  menu?: { icon: string; text: string; }[] | undefined;
};

type Refs = {
  button: HTMLElement;
};

@withStore
export class ChatHeader extends Block<Props, Refs> {
  static componentName = 'ChatHeader';
  protected template = template;
  protected override events = {
    button: {
      click: (e: Event) => this.showMenu(e)
    }
  };

  protected override customProps() {
    return {
      ...super.customProps(),
      onClickMenu: this.onClickMenu.bind(this),
      onUserAdd: this.onUserAdd.bind(this),
      name: () => this.props.store.chats?.filter(chat => chat.id == this.props.store.currentChat)[0]?.name,
    };
  }

  private showMenu(e: Event) {
    e.stopPropagation();
    this.setProps({
      menu: [
        { icon: plus, text: 'Добавить пользователя' },
        { icon: cross, text: 'Удалить пользователя' },
      ]
    });
  }

  private onClickMenu(id: number) {
    void(id);
    this.setProps({ menu: undefined, useradd: true });
  }

  private onUserAdd({ value }: ({ value: string })) {
    this.setProps({ menu: undefined, useradd: false });
    new UserController().find(value).then((userId) => {
      return new ChatController().addUser(this.props.store.currentChat, userId);
    }).catch(e => {
      console.error(e);
    });
  }

  protected override componentDidMount(): void {
    // Пока не реализован функционал меню, тут сами управляем его показом-скрытием, исключительно для демонстрации динамики.
    const handler = () => {
      if (this.props.menu) {
        document.removeEventListener('click', handler);
        this.setProps({ menu: undefined });
      }
    };
    document.addEventListener('click', handler);
  }
}

