import './link.scss';
import { default as template } from './link.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Link extends Block<Props> {
  protected template = template;
}
