import { EventBus } from './EventBus';

export const enum Page {
  chat,
  login,
  registration,
}

type Events = {
  'page': [ Page ]
};

export const navigation = new class Navigation extends EventBus<Events> {
};
