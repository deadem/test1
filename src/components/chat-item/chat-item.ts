import './chat-item.scss';
import template from './chat-item.hbs?raw';
import { Block } from '../../utils/Block';
import { updateStore, withStore, WithStoreProps } from '../../utils/Store';

type Props = WithStoreProps & {
  id: number;
  current: () => boolean;
  time: Date | undefined,
  textTime: () => string | undefined;
};

@withStore
export class ChatItem extends Block<Props> {
  static componentName = 'ChatItem';
  protected template = template;
  protected override events = {
    click: () => {
      updateStore({ currentChat: this.props.id });
    }
  };

  constructor(props: Props) {
    const today = new Date().getTime();
    const msInDay = 86400000;

    super({
      ...props,
      current: () => this.props.store.currentChat == this.props.id,
      textTime: () => {
        const time = this.props.time;
        if (!time) {
          return;
        }

        if (time.getTime() > today - msInDay) {
          return time.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        }

        if (time.getTime() > today - msInDay * 5) {
          return time.toLocaleString('ru-RU', { weekday: 'short' });
        }

        return time.toLocaleDateString('ru-RU', {
          year: 'numeric', month: 'short', day: 'numeric'
        });
      }
    });
  }
}
