import Handlebars from 'handlebars/runtime';
import './chat-header.scss';
import plus from '../../assets/plus_icon.svg';
export { default as ChatHeader } from './chat-header.hbs';

Handlebars.registerHelper('chat-header-menu', () => {
  return [
    { icon: plus, text: 'Добавить пользователя', page: 'chat-user-add' },
    { icon: plus, text: 'Удалить пользователя', page: 'chat-user-add' },
  ];
});
