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
}
