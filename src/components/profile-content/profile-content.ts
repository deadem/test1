import './profile-content.scss';
import template from './profile-content.hbs?raw';
import { Block } from '../../utils/Block';
import * as Validation from '../../utils/Validation';
import { ProfileField } from '../index';

interface Props {
  password: boolean;
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
};

export class ProfileContent extends Block<Props, Refs> {
  static componentName = 'ProfileContent';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      // свойства шаблона
      validate: Validation,
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
