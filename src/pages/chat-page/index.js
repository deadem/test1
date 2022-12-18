import Handlebars from 'handlebars/runtime';
import './chat-page.scss';
export { default as ChatPage } from './chat-page.hbs';

Handlebars.registerHelper('chat-page-list', () => {
  return [
    { name: 'Андрей', message: 'Изображение', date: '10:49', unread: '2' },
    { name: 'Киноклуб', message:'Стикер', date: '12:33' },
    { name: 'Илья', message:'У меня для вас особенный выпуск новостей!...', date: 'Пн', unread: '4' },
    { name: 'Вадим', current: '1', message:'Круто!', date: 'Пт' },
    { name: 'тет-а-теты', message:'И Human Interface Guidelines и Material Design рекомендуют...', date: 'Ср' },
    { name: '1, 2, 3', message:'Миллионы россиян ежедневно проводят десятки часов свое...', date: 'Пн' },
    { name: 'Design Destroyer', message:'В 2008 году художник Jon Rafman начал собирать...', date: 'Ср' },
    { name: 'Day.', message:'Так увлёкся работой по курсу, что совсем забыл его анонсир...', date: '1 Мая 2020' },
    { name: 'Стас Рогозин', message:'Можно или сегодня или завтра вечером.', date: '12 Апр 2020' },
  ];
});
