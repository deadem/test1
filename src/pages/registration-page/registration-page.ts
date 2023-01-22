import './registration-page.scss';
import { default as template } from './registration-page.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class RegistrationPage extends Block<Props> {
  static componentName = 'RegistrationPage';
  protected template = template;
}
