import './dialog.scss';
import { default as template } from './dialog.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Dialog extends Block<Props> {
  protected template = template;
}
