import './login-page.scss';
import template from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';
import { NavigateTo } from '../../utils/Navigation';
import * as Validation from '../../utils/Validation';

interface Props {
  // empty
}

type Refs = {
  login: InputField;
  password: InputField;
  form: HTMLElement;
};

export class LoginPage extends Block<Props, Refs> {
  static componentName = 'LoginPage';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      // свойства для шаблона
      navigateToRegistration: (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        NavigateTo.registation();
      },
      validate: Validation,
    });
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const login = this.refs.login.value();
    const password = this.refs.password.value();
    console.log('login:', login);
    console.log('password:', password);

    if (login && password) {
      NavigateTo.chat();
    }
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
