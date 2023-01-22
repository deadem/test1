import './page-title.scss';
import { default as template } from './page-title.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class PageTitle extends Block<Props> {
  protected template = template;
}
