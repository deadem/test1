import './profile-content.scss';
import { default as template } from './profile-content.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ProfileContent extends Block<Props> {
  static componentName = 'ProfileContent';
  protected template = template;
}
