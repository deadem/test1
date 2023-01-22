import './error-page.scss';
import { default as template } from './error-page.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ErrorPage extends Block<Props> {
  static componentName = 'ErrorPage';
  protected template = template;
}
