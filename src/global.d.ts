// Модуль, импортированный через ?raw импортируется в виде строки
declare module '*?raw' {
  const content: string;
  export default content;
}

// Импорт картинок
declare module '*.svg' {
  const content: string;
  export default content;
}

// Хелпер для декларации конструктора
// Тут должен быть именно any: TS не умеет выводить конструкторы миксинов для других типов
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;
