import './upload-file.scss';
import template from './upload-file.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
  onSubmit: () => void;
}

type Refs = {
  form: HTMLFormElement;
}

export class UploadFile extends Block<Props, Refs> {
  static componentName = 'UploadFile';
  protected template = template;
  protected override events = {
    form: {
      submit: (e: Event) => this.onSubmit(e),
    }
  };

  private onSubmit(e: Event) {
    e.preventDefault();
    this.props.onSubmit();
  }
}
