/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from './Block';

type Constructor<T = {}> = new (...args: any[]) => T;

export type Store = {
  email: string;
  login: string;
};

const store: Store = {
  email: 'ajjzzzakk@mail.ru',
  login: 'aakkaa',
};

function getStore<T>(component: T): Store {
  return new Proxy(store, {
    get(obj: Store, prop: keyof Store) {
      console.log('get', prop, component);
      return obj[prop];
    },
  });
}

type PropsWithStore = {
  store?: Store;
}

export function withStore<Props extends PropsWithStore, T extends Constructor<Block<Props>>>(constructor: T) {
  return class extends constructor {
    protected template!: string;

    constructor(...args: any[]) {
      console.log('constructor');
      super(...args);
      console.log('init props store', this);
      this.props.store = getStore(this);
    }

    protected override compile() {
      console.log('compile starts');
      const value = super.compile();
      console.log('compile ends');
      return value;
    }
  };
}

// class C<Props> {
//   protected props: Props;
//   // public refs = {} as Refs;

//   constructor(props: Props) {
//     this.props = props;
//   }

//   protected compile() {
//     //
//   }
// }

// @withStore
// export class CA extends Block<A> {
//   // render() {
//   // console.log('login', this.props.store.profile.login);
//   // }
// }


// type A = Store & {
//   a: number;
// }

// export const test = new CA({ a: 1 });

/// Proxy

