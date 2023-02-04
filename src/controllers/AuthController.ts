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
      updateStore(convert<Store>()(data, userConverter));
    });
  }

  public isAuthorized() {
    return !!staticStore().userId;
  }
}
