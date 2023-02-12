import './chat-page.scss';
import template from './chat-page.hbs?raw';
import { Block } from '../../utils/Block';
import { MessagesController } from '../../controllers/MessagesController';
import { ChatController } from '../../controllers/ChatController';

interface Props {
  controller: MessagesController;
}

export class ChatPage extends Block<Props> {
  static componentName = 'ChatPage';
  protected template = template;
  protected controller!: MessagesController;

  protected override customProps() {
    this.controller = new MessagesController();
    return {
      ...super.customProps(),
      controller: this.controller,
    };
  }

  public override destroy() {
    this.controller.disconnect();
  }

  protected override componentDidMount(): void {
    new ChatController().request(); // Инициируем подгрузку чатов
  }

}
