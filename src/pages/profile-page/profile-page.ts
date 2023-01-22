import './profile-page.scss';
import { default as template } from './profile-page.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class ProfilePage extends Block<Props> {
  static componentName = 'ProfilePage';
  protected template = template;
}
