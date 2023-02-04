import './profile-page.scss';
import template from './profile-page.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { Button, ProfileContent, ProfileLink } from '../../components';
import { withStore, WithStoreProps } from '../../utils/Store';
import { AuthController } from '../../controllers/AuthController';

interface Props extends WithStoreProps, WithNavigationProps {
}

type Refs = {
  chatLink: HTMLButtonElement;
  exit: ProfileLink;
  edit: ProfileLink;
  editPassword: ProfileLink;
  save: Button;
  fields: ProfileContent;
}

@withStore
@withNavigation
export class ProfilePage extends Block<Props, Refs> {
  static componentName = 'ProfilePage';
  protected template = template;
  protected override events = {
    chatLink: {
      click: () => NavigateTo.chat(),
    },
    logout: {
      click: this.logout.bind(this),
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
      click: () => this.save(),
    }
  };

  private logout() {
    new AuthController().logout().then(() => {
      this.props.navigateTo.login();
    });
  }

  private save() {
    const fields = this.refs.fields.value();
    console.log(fields);
    if (Object.values(fields).filter(value => !value).length) {
      return;
    }

    this.setProps({ edit: false, password: false });
  }
}
