import { registerComponent, registerPartial } from './utils/Handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';
import { Navigation, Page, NavigateTo } from './utils/Navigation';
import { Store, updateStore } from './utils/Store';

document.addEventListener('DOMContentLoaded', () => {
  Object.entries(Components).forEach(([, component ]) => {
    registerComponent(component);
  });

  Object.entries(Partials).forEach(([ name, component ]) => {
    registerPartial(name, component);
  });

  const pages = {
    [Page.chat]: Pages.ChatPage,
    [Page.login]: Pages.LoginPage,
    [Page.registration]: Pages.RegistrationPage,
    [Page.profile]: Pages.ProfilePage,
  };

  Navigation.eventBus().on('page', (page: Page) => {
    const component = pages[page];
    const content = new component({
      // Временная заглушка.
      // Настоящий стор будет добавлен только в те компоненты, которые его попросили через @withStore
      store: {} as Store
    });

    document.body.innerHTML = '';
    document.body.append(content.element());
  });

  // Начальное значение стора
  updateStore({
    email: 'address@example.com',
    login: 'ivan',
  });

  NavigateTo.login();
});
