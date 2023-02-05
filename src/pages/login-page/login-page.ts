import './login-page.scss';
import template from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { ErrorLine, InputField } from '../../components';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { withValidation, WithValidationProps } from '../../utils/Validation';
import { AuthController } from '../../controllers/AuthController';

interface Props extends WithNavigationProps, WithValidationProps {
  login: string;
  password: string;
  error: string;
}

type Refs = {
  login: InputField;
  password: InputField;
  form: HTMLElement;
  errorLine: ErrorLine;
};

@withNavigation
@withValidation
export class LoginPage extends Block<Props, Refs> {
  static componentName = 'LoginPage';
  protected template = template;
  protected override events = {
    form: {
      'submit': this.login.bind(this)
    }
  };

  private login(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const login = this.refs.login.value();
    const password = this.refs.password.value();
    console.log('login:', login);
    console.log('password:', password);

    this.refs.errorLine.setProps({ error: undefined });

    if (login && password) {
      new AuthController().signin(login, password).then(function() {
        NavigateTo.chat();
      }).catch(error => {
        this.refs.errorLine.setProps({ error: error?.reason || 'Неизвестная ошибка' });
      });
    }
  }
}
