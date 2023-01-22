import './search.scss';
import { default as template } from './search.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Search extends Block<Props> {
  protected template = template;
}
