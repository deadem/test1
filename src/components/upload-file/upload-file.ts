import './upload-file.scss';
import { default as template } from './upload-file.hbs?raw';
import { Block } from '../../utils/Block';

interface Props {
}

export class UploadFile extends Block<Props> {
  protected template = template;
}
