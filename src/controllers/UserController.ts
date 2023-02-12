import { updateStore } from '../utils/Store';
import { UserStore } from '../utils/StoreInterface';
import { APIUserData } from './API';
import { Controller } from './Controller';
import { convertFromAPI, convertToAPI } from './Convert';
import { userConverter } from './UserConverter';

export class UserController extends Controller {
  constructor() {
    super('/user');
  }

  updateProfile(props: { [K in 'name' | 'surname' | 'nick' | 'login' | 'email' | 'phone']: string }) {
    const data = convertToAPI<Omit<APIUserData, 'id' | 'avatar'>>()(props, userConverter);
    return this.transport().put<APIUserData>('/profile', { data }).then(data => {
      updateStore(convertFromAPI<UserStore>()(data, userConverter));
    });
  }

  updatePassword(password: string, newPassword: string) {
    return this.transport().put('/password', { data: { oldPassword: password, newPassword } });
  }

  find(name: string) {
    return this.transport().post<Array<{ id: number; login: string; }>>('/search', { data: { login: name } }).then((list) => {
      const user = list.find(value => value.login == name);
      if (!user) {
        throw new Error('Can\'t find user');
      }
      return user.id;
    });
  }
}
