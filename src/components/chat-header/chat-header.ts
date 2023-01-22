import './chat-header.scss';
// import plus from '../../assets/plus_icon.svg';
// import cross from '../../assets/cross_icon.svg';
import { default as template } from './chat-header.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ChatHeader extends Block<Props> {
  protected template = template;
}

// Handlebars.registerHelper('chat-header-menu', () => {
//   return [
//     { icon: plus, text: 'Добавить пользователя', page: 'chat-user-add' },
//     { icon: cross, text: 'Удалить пользователя', page: 'chat-user-add' },
//   ];
// });
