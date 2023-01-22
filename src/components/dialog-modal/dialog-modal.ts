import './dialog-modal.scss';
import { default as template } from './dialog-modal.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class DialogModal extends Block<Props> {
  protected template = template;
}
