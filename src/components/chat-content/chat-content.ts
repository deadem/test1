import './chat-content.scss';
import template from './chat-content.hbs?raw';
import { Block } from '../../utils/Block';
import { ChatController } from '../../controllers/ChatController';
import { withStore, WithStoreProps } from '../../utils/Store';

type Props = WithStoreProps & {
  //
};

@withStore
export class ChatContent extends Block<Props> {
  static componentName = 'ChatContent';
  protected template = template;
  protected controller = new ChatController();

  protected override componentDidMount() {
    this.controller.connect(this.props.store.currentChat);
  }

  public override destroy() {
    this.controller.disconnect();
  }
}
