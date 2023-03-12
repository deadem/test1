import './chat-header.scss';
import plus from '../../assets/plus_icon.svg';
import cross from '../../assets/cross_icon.svg';
import template from './chat-header.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
  menu?: { icon: string; text: string; }[] | undefined;
  onClickMenu(id: number): void;
  onUserAdd(): void;
  useradd?: boolean;
}

type Refs = {
  button: HTMLElement;
}

export class ChatHeader extends Block<Props, Refs> {
  static componentName = 'ChatHeader';
  protected template = template;
  protected override events = {
    button: {
      click: (e: Event) => this.showMenu(e)
    }
  };

  constructor(props: Props) {
    super({
      ...props,
      // внутренние свойства
      onClickMenu: (id: number) => this.onClickMenu(id),
      onUserAdd: () => this.onUserAdd(),
    });
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

  private onUserAdd() {
    this.setProps({ menu: undefined, useradd: false });
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

