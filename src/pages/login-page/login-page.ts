import './login-page.scss';
import template from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { withValidation, WithValidationProps } from '../../utils/Validation';

interface Props extends WithNavigationProps, WithValidationProps {
  // empty
}

type Refs = {
  login: InputField;
  password: InputField;
  form: HTMLElement;
};

@withNavigation
@withValidation
export class LoginPage extends Block<Props, Refs> {
  static componentName = 'LoginPage';
  protected template = template;

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
