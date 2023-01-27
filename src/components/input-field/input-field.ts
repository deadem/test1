import './input-field.scss';
import { default as template } from './input-field.hbs?raw';
import { Block } from '../../utils/Block';
import { Input } from '../input/input';

interface Props {
}

interface Refs {
  input: Input;
}

export class InputField extends Block<Props, Refs> {
  static componentName = 'InputField';
  protected template = template;

  public value() {
    return this.refs.input.value();
  }
}
