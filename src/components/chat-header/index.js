import Handlebars from 'handlebars/runtime';
import './chat-header.scss';
export { default as ChatHeader } from './chat-header.hbs';

Handlebars.registerHelper('chat-header-menu', () => {
  return [
    { text: 'Добавить пользователя', page: 'chat-user-add' },
    { text: 'Удалить пользователя', page: 'chat-user-add' },
  ];
});
