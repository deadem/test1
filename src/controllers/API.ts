export const api = 'https://ya-praktikum.tech/api/v2';

export type APIUserData = {
  avatar: string,
  display_name: string,
  email: string,
  first_name: string,
  id: number,
  login: string,
  phone: string,
  second_name: string,
};

export type APISignupData = {
  email: string,
  first_name: string,
  login: string,
  password: string,
  phone: string,
  second_name: string,
};
