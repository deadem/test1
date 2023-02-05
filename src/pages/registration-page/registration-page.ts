import './registration-page.scss';
import template from './registration-page.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { ErrorLine, InputField } from '../../components';
import { isAllPropsDefined, withValidation, WithValidationProps } from '../../utils/Validation';
import { AuthController } from '../../controllers/AuthController';

interface Props extends WithNavigationProps, WithValidationProps {
}

type Refs = {
  email: InputField;
  errorLine: ErrorLine;
  form: HTMLElement;
  login: InputField;
  name: InputField;
  password: InputField;
  passwordCopy: InputField;
  phone: InputField;
  surname: InputField;
};

@withNavigation
@withValidation
export class RegistrationPage extends Block<Props, Refs> {
  static componentName = 'RegistrationPage';
  protected template = template;
  protected override events = {
    form: {
      'submit': this.onSubmit.bind(this)
    },
  };

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
    this.refs.errorLine.setProps({ error: undefined });

    const fields = {
      email: this.refs.email.value(),
      login: this.refs.login.value(),
      name: this.refs.name.value(),
      surname: this.refs.surname.value(),
      phone: this.refs.phone.value(),
      password: this.refs.password.value(),
    };

    console.log('form:', fields);

    if (!isAllPropsDefined(fields)) {
      return;
    }

    new AuthController().signup(fields).then(() => {
      NavigateTo.chat();
    }).catch(error => {
      this.refs.errorLine.setProps({ error: error?.reason || 'Неизвестная ошибка' });
    });
  }
}
