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
