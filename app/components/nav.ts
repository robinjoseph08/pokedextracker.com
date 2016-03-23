import { Component }  from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { User } from '../classes/user';

const HTML = require('../views/nav.html');

@Component({
  directives: [RouterLink],
  inputs: ['user'],
  selector: 'nav',
  template: HTML
})
export class NavComponent {

  public user: User;

  public signOut () {
    localStorage.removeItem('token');
  }

}
