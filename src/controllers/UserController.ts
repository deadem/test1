import { Store, updateStore } from '../utils/Store';
import { APIUserData, convertFromAPI, convertToAPI } from './API';
import { Controller } from './Controller';

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

export class UserController extends Controller {
  constructor() {
    super('/user');
  }

  updateProfile(props: Pick<Store, 'name' | 'surname' | 'nick' | 'login' | 'email' | 'phone'>) {
    const data = convertToAPI<Omit<APIUserData, 'id' | 'avatar'>>()(props, userConverter);
    return this.transport().put<APIUserData>('/profile', { data }).then(data => {
      updateStore(convertFromAPI<Store>()(data, userConverter));
    });
  }
}
