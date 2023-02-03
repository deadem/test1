import { EventBus } from './EventBus';

export const enum Page {
  chat = '/messenger',
  login = '/',
  registration = '/sigh-up',
  profile = '/settings',
}

type Events = {
  'page': [ Page ]
};

export class Navigation {
  private static events: EventBus<Events>;

  static eventBus() {
    if (!this.events) {
      this.events = new EventBus<Events>();
    }
    return this.events;
  }
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
    Navigation.eventBus().emit('page', page);
  }
}
