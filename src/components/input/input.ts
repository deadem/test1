import './input.scss';
import { default as template } from './input.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class Input extends Block<Props> {
  static componentName = 'Input';
  protected template = template;
  protected override refs = {} as { input: HTMLInputElement };

  public value(): string {
    return this.refs.input.value;
  }
}
