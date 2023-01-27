import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';

interface Props {
}

interface Refs {
  login: InputField;
  password: InputField;
  form: HTMLElement;
}

export class LoginPage extends Block<Props, Refs> {
  static componentName = 'LoginPage';
  protected template = template;

  private onSubmit(e: Event) {
    console.log('login:', this.refs.login.value());
    console.log('password:', this.refs.password.value());

    e.preventDefault();
    e.stopPropagation();
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
