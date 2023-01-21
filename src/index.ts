import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import { registerComponent, registerHelpers } from './handlebars';
import { default as AComponent } from './a.hbs?raw';
import { default as BComponent } from './b.hbs?raw';
import { default as CComponent } from './c.hbs?raw';

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

abstract class Block {
  public id = ++Block.currentIdCounter;

  protected abstract template: string;
  protected props: Record<string, unknown> = {};

  private static currentIdCounter = 0;
  private children: Record<string, Block> = {}; // как таковой не нужен, храним только для того, чтобы было у кого вызывать unmount
  private element: Element | null = null;

  constructor(props: Record<string, unknown>) {
    this.props = props;
  }

  public setProps(props: Record<string, unknown>) {
    this.props = props;
    this.render();
  }

  protected compile() {
    const context = { ...this.props };
    const html = Handlebars.compile(this.template)(context);
    this.children = context.children as Record<string, Block> || {};
    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.values(this.children).forEach((component) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      if (component.element) {
        component.element.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.element);
      }
    });

    return temp.content;
  }

  render() {
    const fragment = this.compile();
    if (!fragment.firstElementChild || fragment.firstElementChild?.nextElementSibling) {
      console.error(fragment);
      throw Error('Only one root supported');
    }

    if (this.element) {
      this.element.replaceWith(fragment);
    } else {
      this.element = fragment.firstElementChild;
    }
  }

  content(): HTMLElement {
    if (!this.element) {
      this.render();
    }
    if (this.constructor.name == 'A') {
      console.log('content', this.element);
    }
    return this.element as HTMLElement;
  }
}

class A extends Block {
  public template = AComponent;
}

class B extends Block {
  public template = BComponent;
}

class C extends Block {
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

  alert(1);
  setTimeout(() => {
    content.setProps({ name: 'waaazzaaa' });
  }, 1000);
});
