import './input.scss';
import { default as template } from './input.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
  onChange(e: Event): void;
}

interface Refs {
  input: HTMLInputElement;
}

export class Input extends Block<Props, Refs> {
  static componentName = 'Input';
  protected template = template;
  protected override events = {
    input: this.props.onChange,
  };

  public value(): string {
    return this.refs.input.value;
  }
}
