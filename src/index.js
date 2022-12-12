import Handlebars from 'handlebars/runtime';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': Pages.LoginPage,
  'registration': Pages.RegistrationPage,
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function Navigate(page) {
  document.body.innerHTML = pages[page]();
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
