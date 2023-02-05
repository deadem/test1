import { staticStore, Store, updateStore } from '../utils/Store';
import { APIUserData } from './API';
import { Controller } from './Controller';
import { convertFromAPI } from './Convert';
import { userConverter } from './UserConverter';

export class AuthController extends Controller {
  constructor() {
    super('/auth');
  }

  public updateState() {
    return this.transport().get<APIUserData>('/user').then(data => {
      updateStore(convertFromAPI<Store>()(data, userConverter));
    });
  }

  public isAuthorized() {
    return !!staticStore().userId;
  }

  public signin(login: string, password: string) {
    return this.transport().post('/signin', { data: { login, password } }).then(() => {
      return this.updateState();
    });
  }

  public logout() {
    return this.transport().post('/logout').then(() => {
      updateStore({}, true);
    });
  }
}
