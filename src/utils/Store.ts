/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from './Block';

type Constructor<T = {}> = new (...args: any[]) => T;

export type Store = {
  email: string;
  login: string;
};

type Component = Block<object>;

class Bindings {
  static store = {} as Store;
  static bindings = {} as {
    [keys in keyof Store]?: Component[]
  };

  static updateStore(store: Partial<Store>) {
    const updatedStore = { ...this.store, ...store };
    const updateList = [] as Component[];
    // Рассчитываем, что в store никогда не будет больше ключей, чем уже есть в this.store
    (Object.keys(updatedStore) as Array<keyof Store>).forEach(prop => {
      // Если изменилось какое-либо свойство, добавляем компонент в список на обновление
      if (this.store[prop] !== updatedStore[prop]) {
        (this.bindings[prop] ?? []).forEach(component => {
          if (updateList.indexOf(component) < 0) {
            updateList.push(component);
          }
        });
      }
    });

    // Изменяем значения в сторе
    this.store = updatedStore;

    // Вызываем обновления для списка компонентов.
    updateList.reverse().forEach(component => {
      // Если компонент уже выключен из DOM (находится в фазе разрушения), не отправляем ему обновление
      if (component.element().isConnected) {
        console.log('update', component);
        component.setProps({ store: this.getStore(component) });
      }
    });
  }

  static registerBinding(component: Component, prop: keyof Store) {
    const list = this.bindings[prop] ?? [];
    if (list.indexOf(component) >= 0) {
      // уже зарегистрирован
      return;
    }
    list.push(component);
    console.log('register', component, list);
    this.bindings[prop] = list;
  }

  static unregisterBinding(component: Component) {
    (Object.keys(this.bindings) as Array<keyof Store>).forEach(prop => {
      this.bindings[prop] = (this.bindings[prop] ?? []).filter(i => i != component);
    });
  }

  static getStore<T extends Component>(component: T): Store {
    return new Proxy(this.store, {
      get(obj: Store, prop: keyof Store) {
        Bindings.registerBinding(component, prop);
        console.log('get', prop, component);
        return obj[prop];
      },
    });
  }
}

// Начальное значение стора
Bindings.updateStore({
  email: 'ajjzzzakk@mail.ru',
  login: 'aakkaa',
});

setTimeout(() => {
  // Начальное значение стора
  Bindings.updateStore({
    email: 'aj111jzzzakk@mail.ru',
    login: 'aak11kaa',
  });
}, 3000);

type PropsWithStore = {
  store?: Store;
}

export function withStore<Props extends PropsWithStore, T extends Constructor<Block<Props>>>(constructor: T) {
  return class extends constructor {
    protected template!: string;

    protected override render() {
      this.props.store = Bindings.getStore(this);
      return super.render();
    }

    protected override componentWillUnmount(): void {
      super.componentWillUnmount();
      Bindings.unregisterBinding(this);
    }
  };
}
