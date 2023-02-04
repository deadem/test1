import { staticStore, Store, updateStore } from '../utils/Store';
import { APIUserResponse, convert } from './API';
import { Controller } from './Controller';

const userConverter = {
  id: 'userId',
  first_name: 'name',
  second_name: 'surname',
  display_name: 'nick',
  login: 'login',
  avatar: 'avatar',
  email: 'email',
  phone: 'phone'
} as const;

export class AuthController extends Controller {
  constructor() {
    super('/auth');
  }

  public updateState() {
    return this.transport().get<APIUserResponse>('/user').then(data  => {
      const store = convert<Store>()(data, userConverter);
      updateStore(store);
      console.log('done', data);
    });
  }

  public isAuthorized() {
    return !!staticStore().userId;
  }
}
