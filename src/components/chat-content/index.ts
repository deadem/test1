import Handlebars from 'handlebars';
import './chat-content.scss';
import { message } from './chat-content';
export { default as ChatContent } from './chat-content.hbs?raw';

Handlebars.registerHelper('chat-content', (section: keyof typeof message) => message[section]);
