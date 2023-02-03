import { registerComponent, registerPartial } from './utils/Handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';
import { Navigation, Page } from './utils/Navigation';
import { updateStore } from './utils/Store';
import { Router } from './utils/Router';

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

  const pages = {
    [Page.chat]: Pages.ChatPage,
    [Page.login]: Pages.LoginPage,
    [Page.registration]: Pages.RegistrationPage,
    [Page.profile]: Pages.ProfilePage,
  };

  Object.entries(pages).forEach(([ path, block ]) => {
    Router.use(path, '', block);
  });

  // Всё, что не заматчилось отображаем как ошибку
  Router.use(/.?/, 'Error', Pages.ErrorPage);

  Router.start();

  Navigation.eventBus().on('page', (page: Page) => {
    Router.go(page);
  });
});
