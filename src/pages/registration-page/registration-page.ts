import './registration-page.scss';
import template from './registration-page.hbs?raw';
import { Block } from '../../utils/Block';
import { navigation, Page } from '../../utils/Navigation';
import * as Validation from '../../utils/Validation';
import { InputField } from '../../components';

interface Props {
}

type Refs = {
  form: HTMLElement;
  email: InputField;
  name: InputField;
  surname: InputField;
  phone: InputField;
  login: InputField;
  password: InputField;
  passwordCopy: InputField;
};

export class RegistrationPage extends Block<Props, Refs> {
  static componentName = 'RegistrationPage';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      // свойства шаблона
      navigateToLogin: (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigation.emit('page', Page.login);
      },
      validate: Validation,
      validatePasswordCopy: (value: string) => {
        if (value != this.refs.password.value()) {
          return 'Пароли не совпадают';
        }
      }
    });
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const email = this.refs.email.value();
    const login = this.refs.login.value();
    const name = this.refs.name.value();
    const surname = this.refs.surname.value();
    const phone = this.refs.phone.value();
    const password = this.refs.password.value();
    const passwordCopy = this.refs.passwordCopy.value();

    console.log('form:', email, login, name, surname, phone, password, passwordCopy);

    if (email && login && name && surname && phone && password && passwordCopy) {
      navigation.emit('page', Page.chat);
    }
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
