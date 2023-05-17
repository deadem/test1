import './user-add.scss';
import template from './user-add.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
  onSubmit: () => void;
}

type Refs = {
  form: HTMLFormElement;
}

export class UserAdd extends Block<Props, Refs> {
  static componentName = 'UserAdd';
  protected template = template;
  protected override events = {
    form: {
      submit: (e: Event) => this.onSubmit(e)
    }
  };

  private onSubmit(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    this.props.onSubmit();
  }
}
