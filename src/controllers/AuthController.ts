import { staticStore, updateStore } from '../utils/Store';
import { UserStore } from '../utils/StoreInterface';
import { APISignupData, APIUserData } from './API';
import { Controller } from './Controller';
import { convertFromAPI, convertToAPI } from './Convert';
import { userConverter } from './UserConverter';

type SignupData = {
  name: string;
  surname: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export class AuthController extends Controller {
  constructor() {
    super('/auth');
  }

  public updateState() {
    return this.transport().get<APIUserData>('/user').then(data => {
      updateStore(convertFromAPI<UserStore>()(data, userConverter));
    });
  }

  public isAuthorized() {
    return !!staticStore().userId;
  }

  public signup(data: SignupData) {
    return this.transport().post<{ id: number }>('/signup', { data: convertToAPI<APISignupData>()(data, userConverter) }).then(() => {
      return this.updateState();
    });
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
