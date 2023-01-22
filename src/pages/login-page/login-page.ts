import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class LoginPage extends Block<Props> {
  static componentName = 'LoginPage';
  protected template = template;

  private onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  protected override componentDidMount() {
    this.ref('form').addEventListener('submit', this.onSubmit);
  }
}
