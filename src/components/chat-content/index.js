import Handlebars from 'handlebars/runtime';
import './chat-content.scss';
export { default as ChatContent } from './chat-content.hbs';

Handlebars.registerHelper('chat-content-text', () => {
  return [
    "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
    "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    ];
});

Handlebars.registerHelper('chat-content-image', () => {
  return new URL(
    '../../assets/chat-message-image.png',
    import.meta.url
  );
});
