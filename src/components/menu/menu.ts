import './menu.scss';
import template from './menu.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Menu extends Block<Props> {
  static componentName = 'Menu';
  protected template = template;
}
