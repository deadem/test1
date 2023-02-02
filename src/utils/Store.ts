import { Block } from './Block';
import { StoreBindings } from './StoreBindings';

// Описание типов в сторе
export type Store = {
  email: string;
  login: string;
};

// Статический класс для ленивой инициализации стора
class Storage {
  static store: StoreBindings<Store>;

  static bingings() {
    if (!this.store) {
      this.store = new StoreBindings();
    }

    return this.store;
  }
}

// Тут должен быть именно any: TS не умеет выводить конструкторы миксинов для других типов
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

type PropsWithStore = {
  store: Store;
}

// Декоратор, автоматически добавляющий в класс Store
// У свойств оборачиваемого компонента резервируется свойство store. К нему можно обращаться, но нельзя переопределять его тип.
// При подключении проверяем наличие свойства store в Props.
export function withStore<Props extends PropsWithStore, T extends Constructor<Block<Props>>>(constructor: T) {
  return class extends constructor {
    protected template!: string; // Тушим предупреждение TS: это абстрактное свойство будет определено в настоящем наследнике от Block<>

    protected override render() {
      this.props.store = Storage.bingings().getStore(this);
      return super.render();
    }

    protected override componentWillUnmount(): void {
      super.componentWillUnmount();
      Storage.bingings().unregisterBinding(this);
    }
  };
}

// Обновление значений в сторе
export function updateStore(store: Partial<Store>) {
  Storage.bingings().updateStore(store);
}
