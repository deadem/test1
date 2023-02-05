import { Store } from '../utils/Store';
import { APIUserData } from './API';

// Поля в конвертере должны совпадать с полями в API, а значения - с полями в Store
// Проверка на соответствие происходит в момент конвертации
export const userConverter = {
  id: 'userId',
  first_name: 'name',
  second_name: 'surname',
  display_name: 'nick',
  login: 'login',
  avatar: 'avatar',
  email: 'email',
  phone: 'phone'
} as const;

type UserConverterType = typeof userConverter;

// Убедимся, что все ключи в userConverter присутствуют в ключах APIUserData
staticAssert<EmptyObject extends Omit<UserConverterType, keyof APIUserData> ? true : false>;

// Убедимся, что значения в userConverter - это ключи из Store
staticAssert<Exclude<UserConverterType[keyof UserConverterType], keyof Store> extends never ? true : false>;
