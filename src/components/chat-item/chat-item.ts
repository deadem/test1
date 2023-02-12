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

  protected override customProps() {
    return {
      ...super.customProps(),
      current: () => this.props.store.currentChat == this.props.id,
    };
  }
}
