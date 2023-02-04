import { staticStore, Store, updateStore } from '../utils/Store';
import { APIUserResponse, convert } from './API';
import { Controller } from './Controller';
import { userConverter } from './UserController';

export class AuthController extends Controller {
  constructor() {
    super('/auth');
  }

  public updateState() {
    return this.transport().get<APIUserResponse>('/user').then(data => {
      updateStore(convert<Store>()(data, userConverter));
    });
  }

  public isAuthorized() {
    return !!staticStore().userId;
  }

  public signin(login: string, password: string) {
    return this.transport().post('/signin', { data: { login, password } }).catch(error => {
      // Если произошла ошибка авторизации, перебрасываем текст ошибки дальше
      throw (error?.reason ?? 'Ошибка авторизации');
    }).then(() => {
      return this.updateState();
    });
  }

  public logout() {
    return this.transport().post('/logout').then(() => {
      updateStore({}, true);
    });
  }
}
