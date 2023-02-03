import './registration-page.scss';
import template from './registration-page.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { InputField } from '../../components';
import { withValidation, WithValidationProps } from '../../utils/Validation';

interface Props extends WithNavigationProps, WithValidationProps {
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

@withNavigation
@withValidation
export class RegistrationPage extends Block<Props, Refs> {
  static componentName = 'RegistrationPage';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      // свойства шаблона
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
      NavigateTo.chat();
    }
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
