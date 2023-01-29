import './profile-page.scss';
import template from './profile-page.hbs?raw';
import { Block } from '../../utils/Block';
import { navigation, Page } from '../../utils/Navigation';
import { Button, ProfileLink } from '../../components';

interface Props {
}

type Refs = {
  chatLink: HTMLButtonElement;
  exit: ProfileLink;
  edit: ProfileLink;
  editPassword: ProfileLink;
  save: Button;
}

export class ProfilePage extends Block<Props, Refs> {
  static componentName = 'ProfilePage';
  protected template = template;
  protected override events = {
    chatLink: {
      click: () => navigation.emit('page', Page.chat),
    },
    exit: {
      click: (e: Event) => {
        e.preventDefault();
        navigation.emit('page', Page.login);
      },
    },
    edit: {
      click: (e: Event) => {
        e.preventDefault();
        this.setProps({ edit: true, password: false });
      }
    },
    editPassword: {
      click: (e: Event) => {
        e.preventDefault();
        this.setProps({ edit: true, password: true });
      }
    },
    save: {
      click: () => this.setProps({ edit: false }),
    }
  };
}
