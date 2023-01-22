import './input-field.scss';
import { default as template } from './input-field.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class InputField extends Block<Props> {
  protected template = template;
}
