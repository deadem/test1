import './profile-page.scss';
import template from './profile-page.hbs?raw';
import { Block } from '../../utils/Block';
import { NavigateTo, withNavigation, WithNavigationProps } from '../../utils/Navigation';
import { Button, ErrorLine, ProfileContent, ProfileLink } from '../../components';
import { withStore, WithStoreProps } from '../../utils/Store';
import { AuthController } from '../../controllers/AuthController';
import { UserController } from '../../controllers/UserController';
import { isAllPropsDefined } from '../../utils/Validation';

interface Props extends WithStoreProps, WithNavigationProps {
  edit?: boolean;
  password?: boolean;
}

type Refs = {
  chatLink: HTMLButtonElement;
  exit: ProfileLink;
  edit: ProfileLink;
  editPassword: ProfileLink;
  save: Button;
  form: HTMLElement;
  fields: ProfileContent;
  errorLine: ErrorLine;
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
    form: {
      'submit': this.save.bind(this)
    },
  };

  private logout() {
    new AuthController().logout().then(() => {
      this.props.navigateTo.login();
    });
  }

  private save(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.password) {
      this.updatePassword();
      return;
    }

    this.updateProfile();
  }

  private updateProfile() {
    const fields = this.refs.fields.profileFields();

    if (!isAllPropsDefined(fields)) {
      return;
    }

    new UserController().updateProfile(fields).then(() => {
      this.setProps({ edit: false, password: false });
    }).catch(error => {
      this.refs.errorLine.setProps({ error: error?.reason || 'Ошибка сохранения' });
    });
  }

  private updatePassword() {
    const fields = this.refs.fields.passwordFields();
    if (!isAllPropsDefined(fields)) {
      return;
    }

    new UserController().updatePassword(fields.password, fields.passwordNew).then(() => {
      this.setProps({ edit: false, password: false });
    }).catch(error => {
      this.refs.errorLine.setProps({ error: error?.reason || 'Ошибка сохранения' });
    });
  }
}
