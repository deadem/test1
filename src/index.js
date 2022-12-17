import Handlebars from 'handlebars/runtime';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'chat': [ Pages.ChatPage ],
  'error': [ Pages.ErrorPage ],
  'login': [ Pages.LoginPage ],
  'profile': [ Pages.ProfilePage ],
  'profile-edit': [ Pages.ProfilePage, { edit: true } ],
  'profile-edit-password': [ Pages.ProfilePage, { edit: true, password: true } ],
  'registration': [ Pages.RegistrationPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function Navigate(page) {
  const template = pages[page];
  document.body.innerHTML = template[0](template[1]);
}

document.addEventListener('DOMContentLoaded', () => Navigate('login'));

document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    Navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
