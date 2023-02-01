import './profile-content.scss';
import template from './profile-content.hbs?raw';
import { Block } from '../../utils/Block';
import { ProfileField } from '../index';
import * as Validation from '../../utils/Validation';
import { Store, withStore } from '../../utils/Store';

interface Props {
  password: boolean;
  store: Store;
}

type Refs = {
  email: ProfileField;
  login: ProfileField;
  name: ProfileField;
  surname: ProfileField;
  nick: ProfileField;
  phone: ProfileField;
  password: ProfileField;
  passwordNew: ProfileField;
  passwordNewCopy: ProfileField;
  upload: HTMLElement;
};

@withStore
export class ProfileContent extends Block<Props, Refs> {
  static componentName = 'ProfileContent';
  protected template = template;
  protected override events = {
    upload: {
      click: () => { this.setProps({ upload: true }); }
    }
  };

  constructor(props: Props) {
    super({
      ...props,
      // свойства шаблона
      validate: Validation,
      onAddAvatar: () => { this.setProps({ upload: false }); },
    });
  }

  public value() {
    if (this.props.password) {
      return {
        password: this.refs.password.value(),
        passwordNew: this.refs.passwordNew.value(),
        passwordNewCopy: this.refs.passwordNewCopy.value(),
      };
    }

    return {
      email: this.refs.email.value(),
      login: this.refs.login.value(),
      name: this.refs.name.value(),
      surname: this.refs.surname.value(),
      nick: this.refs.nick.value(),
      phone: this.refs.phone.value(),
    };
  }
}
