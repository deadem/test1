/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from './Block';

type Constructor<T = {}> = new (...args: any[]) => T;

export type Store = {
  email: string;
  login: string;
};

type Component = Block<object>;

interface TreeNode {
  parent: this | undefined;
  component: Component | undefined;
  children: this[];
}

class Bindings {
  static store = {} as Store;
  static componentRoot = {} as TreeNode;
  static currentRenderStack = [] as Component[];
  static bindings = {} as {
    [keys in keyof Store]: Component[]
  };

  static updateStore(store: Partial<Store>) {
    this.store = { ...this.store, ...store };
  }

  static registerBinding(component: Component, prop: keyof Store) {
    if (this.bindings[prop]?.indexOf(component) >= 0) {
      // уже зарегистрирован
      return;
    }
    (this.bindings[prop] = this.bindings[prop] ?? []).push(component);

    // На момент регистрации компонент должен быть текущим,


    const node = this.findComponentNode(component);
    if (!node) {
      // если его ещё нет в дереве - добавляем
    }
  }

  static getStore<T extends Component>(component: T): Store {
    return new Proxy(this.store, {
      get(obj: Store, prop: keyof Store) {
        Bindings.registerBinding(component, prop);
        console.log('get', prop, component, Bindings.currentRenderStack);
        return obj[prop];
      },
    });
  }

  static findComponentNode(component: Component, subtree = this.componentRoot): TreeNode | void {
    if (!subtree || !subtree.component) {
      return;
    }
    if (component == subtree.component) {
      return subtree;
    }
    for (let i = 0; i < subtree.children.length; ++i) {
      const candidate = this.findComponentNode(component, subtree.children[i]);
      if (candidate) {
        return candidate;
      }
    }
  }

  static removeComponent(component: Component): void {
    (Object.keys(this.bindings) as Array<keyof Store>).forEach(prop => {
      this.bindings[prop] = this.bindings[prop].filter(i => i != component);
    });

    const node = this.findComponentNode(component);
    if (!node) {
      return;
    }
    const parent = node.parent;
    if (parent) {
      parent.children = parent.children.filter(i => i.component != component);
    } else {
      node.component = undefined;
    }
  }

  static updateSubTree<T>(node: Component, callback: () => T): T {
    console.log('compile starts');
    this.removeComponent(node);
    this.currentRenderStack.push(node);
    const result = callback();
    this.currentRenderStack.pop();
    console.log('compile ends');
    return result;
  }
}

// Начальное значение стора
Bindings.updateStore({
  email: 'ajjzzzakk@mail.ru',
  login: 'aakkaa',
});

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
      this.props.store = Bindings.getStore(this);
    }

    protected override compile(): Element {
      return Bindings.updateSubTree(this, () => { return super.compile(); });
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

