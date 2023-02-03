import { registerComponent, registerPartial } from './utils/Handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';
import { Router, Page } from './utils/Navigation';
import { updateStore } from './utils/Store';

document.addEventListener('DOMContentLoaded', () => {
  Object.entries(Components).forEach(([, component ]) => {
    registerComponent(component);
  });

  Object.entries(Partials).forEach(([ name, component ]) => {
    registerPartial(name, component);
  });

  // Начальное значение стора
  updateStore({
    email: 'address@example.com',
    login: 'ivan',
  });

  Router
    .use(Page.chat, 'Чаты', Pages.ChatPage)
    .use(Page.login, 'Авторизация', Pages.LoginPage)
    .use(Page.registration, 'Регистрация', Pages.RegistrationPage)
    .use(Page.profile, 'Профиль', Pages.ProfilePage)
    .use(/.?/, 'Error', Pages.ErrorPage); // Всё, что не заматчилось отображаем как ошибку

  Router.start();
});
