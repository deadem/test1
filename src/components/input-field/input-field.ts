import './input-field.scss';
import { default as template } from './input-field.hbs?raw';
import { Block } from '../../utils/Block';
import { Input } from '../input/input';
import { ErrorLine } from '../error-line/error-line';

interface Props {
  validate?: (value: string) => void | string;
  error?: string | undefined;
  value?: string;
}

type Refs = {
  input: Input;
  errorLine: ErrorLine;
}

export class InputField extends Block<Props, Refs> {
  static componentName = 'InputField';
  protected template = template;

  constructor(props: Props) {
    super({
      ...props,
      // onFocus: () => this.validate(),
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return false;
    }
    return this.refs.input.value();
  }

  private validate() {
    const value = this.refs.input.value();
    const error = this.props.validate?.(value);
    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }
    this.refs.errorLine.setProps({ error: undefined });
    return true;
  }
}
