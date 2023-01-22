import './user-add.scss';
import { default as template } from './user-add.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class UserAdd extends Block<Props> {
  static componentName = 'UserAdd';
  protected template = template;
}
