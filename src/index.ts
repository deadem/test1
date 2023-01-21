import Handlebars, { HelperOptions } from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
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
  private children: Record<string, Block> = {};
  private element: HTMLElement | null = null;

  constructor(props: Record<string, unknown>) {
    this.props = props;
    console.log('Contruct ', props, this.constructor.name);
  }

  protected compile(template: (context: unknown) => string, context: Record<string, unknown>) {
    const contextAndStubs = { ...context };
    const html = template(contextAndStubs);
    this.children = contextAndStubs.children as Record<string, Block> || {};
    const temp = document.createElement('template');
    temp.innerHTML = html;

    console.log('compile', this.element, html, this.children);
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      console.log('stub', stub?.childNodes);
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
    const element = this.compile((context) => Handlebars.compile(this.template)(context), this.props);
    console.log('render', this.constructor.name, element, this.props);
    this.element?.replaceWith(element);
    this.element = element as Node as HTMLElement;
  }

  content(): HTMLElement {
    if (!this.element) {
      this.render();
    }
    return this.element as HTMLElement;
  }
}

class A extends Block {
  public template = AComponent;
  public _render = this.render();
}

class B extends Block {
  public template = BComponent;
  public _render = this.render();
}

class C extends Block {
  public template = CComponent;
  public _render = this.render();
}

export function registerComponent<T extends Block>(Component: { new (...args: ConstructorParameters<typeof Block>): T }) {
  Handlebars.registerHelper(Component.name,
    function (this: unknown, { hash, data }: HelperOptions) {
      const component = new Component(hash);
      (data.root.children = data.root.children || {})[component.id] = component;
      return `<div data-id="${component.id}"></div>`;
    },
  );
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponent(A);
  registerComponent(B);
  registerComponent(C);

  const content = new A({ name: 'test' });

  document.body.innerHTML = '';
  document.body.append(content.content());
});
