import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';

interface Props {
}

export class LoginPage extends Block<Props> {
  static componentName = 'LoginPage';
  protected template = template;
  protected override refs = {} as { login: InputField, password: InputField, form: HTMLElement };

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
