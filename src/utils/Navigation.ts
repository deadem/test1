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
    this.navigate(Page.chat);
  }

  static login() {
    this.navigate(Page.login);
  }

  static registation() {
    this.navigate(Page.registration);
  }

  static profile() {
    this.navigate(Page.profile);
  }

  private static navigate(page: Page) {
    Router.go(page);
  }
}
