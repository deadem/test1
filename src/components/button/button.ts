import './button.scss';
import { default as template } from './button.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Button extends Block<Props> {
  static componentName = 'Button';
  protected template = template;
}
