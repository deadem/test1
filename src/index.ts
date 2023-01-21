import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'chat': [ Pages.ChatPage ],
  'chat-menu-user': [ Pages.ChatPage, { menu: true } ],
  'chat-user-add': [ Pages.ChatPage, { useradd: true } ],
  'error': [ Pages.ErrorPage ],
  'login': [ Pages.LoginPage ],
  'profile': [ Pages.ProfilePage ],
  'profile-avatar-upload': [ Pages.ProfilePage, { upload: true } ],
  'profile-edit': [ Pages.ProfilePage, { edit: true } ],
  'profile-edit-password': [ Pages.ProfilePage, { edit: true, password: true } ],
  'registration': [ Pages.RegistrationPage ],
};

type PageName = keyof typeof pages;

Object.entries(Components as Record<string, string>).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: PageName) {
  const [ source, args ] = pages[page];
  document.body.innerHTML = Handlebars.compile(source)(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
  const page = (e.target as HTMLElement)?.getAttribute('page') as PageName;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
