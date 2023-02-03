import { Block } from './Block';
import { Router } from './Router';
export { Router };

export const enum Page {
  chat = '/messenger',
  login = '/',
  registration = '/sign-up',
  profile = '/settings',
}

export class NavigateTo {
  static chat() {
    NavigateTo.navigate(Page.chat);
  }

  static login() {
    NavigateTo.navigate(Page.login);
  }

  static registration() {
    NavigateTo.navigate(Page.registration);
  }

  static profile() {
    NavigateTo.navigate(Page.profile);
  }

  private static navigate(page: Page) {
    Router.go(page);
  }
}

export type WithNavigationProps = {
  navigateTo: NavigateTo;
}

export function withNavigation<Props extends WithNavigationProps, T extends Constructor<Block<Props>>>(constructor: T): T {
  return class extends constructor {
    protected template!: string;

    // Вынуждены использовать any[], см. ts(2545)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      const [ props ] = args;
      super({
        ...props,
        navigateTo: NavigateTo
      } as WithNavigationProps);
    }
  };
}
