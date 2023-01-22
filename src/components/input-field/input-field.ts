import './input-field.scss';
import { default as template } from './input-field.hbs?raw';
import { Block } from '../../utils/Block';
import { Input } from '../input/input';

interface Props {
}

export class InputField extends Block<Props> {
  static componentName = 'InputField';
  protected template = template;
  protected override refs = {} as { input: Input };

  public value() {
    return this.refs.input.value();
  }
}
