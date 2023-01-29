import './input.scss';
import { default as template } from './input.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
  onBlur?(e: Event): void;
  onFocus?(e: Event): void;
  onChange?(e: Event): void;
}

type Refs = {
  input: HTMLInputElement;
};

export class Input extends Block<Props, Refs> {
  static componentName = 'Input';
  protected template = template;
  protected override events = {
    input: {
      input: this.props.onChange,
      focus: this.props.onFocus,
      blur: this.props.onBlur,
    }
  };

  public value(): string {
    return this.refs.input.value;
  }
}
