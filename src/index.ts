import { registerComponent, registerPartial } from './utils/Handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';
import { Router, Page } from './utils/Navigation';
import { authorized, checkauth } from './utils/Middleware';

document.addEventListener('DOMContentLoaded', () => {
  Object.entries(Components).forEach(([, component ]) => {
    registerComponent(component);
  });

  Object.entries(Partials).forEach(([ name, component ]) => {
    registerPartial(name, component);
  });

  Router
    .use(Page.chat, 'Чаты', Pages.ChatPage, authorized)
    .use(Page.login, 'Авторизация', Pages.LoginPage, checkauth)
    .use(Page.registration, 'Регистрация', Pages.RegistrationPage)
    .use(Page.profile, 'Профиль', Pages.ProfilePage, authorized)
    .use(/.?/, 'Error', Pages.ErrorPage); // Всё, что не заматчилось отображаем как ошибку

  Router.start();
});
