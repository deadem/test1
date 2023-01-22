import './login-page.scss';
import { default as template } from './login-page.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class LoginPage extends Block<Props> {
  static componentName = 'LoginPage';
  protected template = template;
}
