import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import { registerComponent, registerHelpers } from './handlebars';
import { default as AComponent } from './a.hbs?raw';
import { default as BComponent } from './b.hbs?raw';
import { default as CComponent } from './c.hbs?raw';
import { Block } from './utils/Block';

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
  return page;
  //console.log(page);
  // const [ source, args ] = pages[page];
  // document.body.innerHTML = Handlebars.compile(source)(args);
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

interface Props {
  name: string;
}

class A extends Block<Props> {
  public template = AComponent;
}

class B extends Block<object> {
  public template = BComponent;
}

class C extends Block<object> {
  public template = CComponent;
}

document.addEventListener('DOMContentLoaded', () => {
  registerHelpers();

  registerComponent(A);
  registerComponent(B);
  registerComponent(C);

  const content = new A({ name: 'test' });

  document.body.innerHTML = '';
  document.body.append(content.content());

  setTimeout(() => {
    content.setProps({ name: 'waaazzaaa' });
  }, 1000);
});
