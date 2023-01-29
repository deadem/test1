import { registerComponent, registerPartial } from './utils/Handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';
import { navigation, Page } from './utils/Navigation';

Object.entries(Components).forEach(([, component ]) => {
  registerComponent(component);
});

Object.entries(Partials).forEach(([ name, component ]) => {
  registerPartial(name, component);
});

function init() {
  const pages = {
    [Page.chat]: Pages.ChatPage,
    [Page.login]: Pages.LoginPage,
    [Page.registration]: Pages.RegistrationPage,
    // 'chat': [ Pages.ChatPage ],
    // 'chat-menu-user': [ Pages.ChatPage, { menu: true } ],
    // 'chat-user-add': [ Pages.ChatPage, { useradd: true } ],
    // 'error': [ Pages.ErrorPage ],
    // 'login': [ Pages.LoginPage ],
    // 'profile': [ Pages.ProfilePage ],
    // 'profile-avatar-upload': [ Pages.ProfilePage, { upload: true } ],
    // 'profile-edit': [ Pages.ProfilePage, { edit: true } ],
    // 'profile-edit-password': [ Pages.ProfilePage, { edit: true, password: true } ],
    // 'registration': [ Pages.RegistrationPage ],
  };

  navigation.on('page', (page: Page) => {
    const component = pages[page];
    const content = new component({});

    document.body.innerHTML = '';
    document.body.append(content.element());
  });

  navigation.emit('page', Page.registration);
}

document.addEventListener('DOMContentLoaded', init);
