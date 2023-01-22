import { registerComponent, registerPartial } from './handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Partials from './partials';

const pages = {
  // 'chat': [ Pages.ChatPage ],
  // 'chat-menu-user': [ Pages.ChatPage, { menu: true } ],
  // 'chat-user-add': [ Pages.ChatPage, { useradd: true } ],
  'error': [ Pages.ErrorPage ],
  'login': [ Pages.LoginPage ],
  'profile': [ Pages.ProfilePage ],
  // 'profile-avatar-upload': [ Pages.ProfilePage, { upload: true } ],
  // 'profile-edit': [ Pages.ProfilePage, { edit: true } ],
  // 'profile-edit-password': [ Pages.ProfilePage, { edit: true, password: true } ],
  'registration': [ Pages.RegistrationPage ],
};

type PageName = keyof typeof pages;

Object.entries(Components).forEach(([, component ]) => {
  registerComponent(component);
});

Object.entries(Partials).forEach(([ name, component ]) => {
  registerPartial(name, component);
});

function navigate(page: PageName) {
  const [ component, args ] = pages[page];
  const content = new component(args || {});

  document.body.innerHTML = '';
  document.body.append(content.content());
}

document.addEventListener('DOMContentLoaded', () => navigate('profile'));
