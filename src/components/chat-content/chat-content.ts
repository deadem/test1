import './chat-content.scss';
import template from './chat-content.hbs?raw';
import { Block } from '../../utils/Block';
import { withStore, WithStoreProps } from '../../utils/Store';
import { MessagesController } from '../../controllers/MessagesController';

type Props = WithStoreProps & {
  controller: MessagesController;
};

type Refs = {
  page: HTMLDivElement;
};

@withStore
export class ChatContent extends Block<Props, Refs> {
  static componentName = 'ChatContent';
  protected template = template;

  protected override componentDidMount() {
    this.props.controller.connect(this.props.store.currentChat);
    this.refs.page.scrollTop = 1000000;
  }

  public override destroy() {
    this.props.controller.disconnect();
  }
}
