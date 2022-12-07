import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = Pages.LoginPage();
});
