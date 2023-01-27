import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';

interface Props {
  navigate(page: string): void;
}

interface FullProps extends Props {
  navigateToRegistration(e: Event): void;
}

interface Refs {
  login: InputField;
  password: InputField;
  form: HTMLElement;
}

export class LoginPage extends Block<FullProps, Refs> {
  static componentName = 'LoginPage';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      navigateToRegistration: (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.props.navigate('registration');
      },
    });
  }

  private onSubmit(e: Event) {
    console.log('login:', this.refs.login.value());
    console.log('password:', this.refs.password.value());

    e.preventDefault();
    e.stopPropagation();

    this.props.navigate('chat');
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
