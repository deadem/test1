export const api = 'https://ya-praktikum.tech/api/v2';

export type APIUserResponse = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string,
  email: string,
  phone: string
};

export function convert<Store extends Record<string | number, string | number>>() {
  // Что тут происходит?
  // Есть три типа:
  // - Store - внутреннее хранилище данных
  // - Resp - данные, которые пришли в ответе сервера
  // - Conv - таблица перекодирования ключей из серверного ответа в ключи для Store.
  // Мы рассчитываем, что типы данных в Store и в Resp совпадают, отличаются только ключи (проверки на совпадение типов сейчас нет, чтобы ещё тут не усложнять)
  // Проверяем только:
  // - в типе Conv описаны ключи из Resp и им сопоставлены ключи из Store. При несовпадении ключей-значений в Conv будет ошибка сборки.
  //
  // Почему вложенная функция: чтобы можно было передать только один аргумент для Store в дженерик, а два других чтобы вывелись сами из аргументов.
  // В TS нельзя передавать только часть типов для дженерика - или все, или ничего (или значение по умолчанию).
  return function<Resp extends object, Conv extends { [keys in keyof Resp]: keyof Store }>(response: Resp, converter: Conv): Store {
    return (Object.entries(response) as [ [keyof Resp, Store[Conv[keyof Resp]]] ]).reduce((store, [ key, value ]) => {
      const storeKey = converter[key];
      if (storeKey) {
        store[storeKey] = value;
      }
      return store;
    }, {} as Store);
  };
}
