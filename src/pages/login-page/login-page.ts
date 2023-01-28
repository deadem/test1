import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';
import { navigation, Page } from '../../utils/Navigation';

interface Props {
  // empty
}

interface Refs {
  login: InputField;
  password: InputField;
  form: HTMLElement;
}

export class LoginPage extends Block<Props, Refs> {
  static componentName = 'LoginPage';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      onChangeLogin: (e: Event) => console.log(e),
      navigateToRegistration: (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        navigation.emit('page', Page.registration);
      },
    });
  }

  private onSubmit(e: Event) {
    console.log('login:', this.refs.login.value());
    console.log('password:', this.refs.password.value());

    e.preventDefault();
    e.stopPropagation();

    navigation.emit('page', Page.chat);
  }

  protected override componentDidMount() {
    this.refs.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}
