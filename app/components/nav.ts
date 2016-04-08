import { Component }  from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { SessionService } from '../services/session';
import { User }           from '../classes/user';

const HTML = require('../views/nav.html');

@Component({
  directives: [RouterLink],
  inputs: ['user'],
  providers: [SessionService],
  selector: 'nav',
  template: HTML
})
export class NavComponent {

  public _session: SessionService;
  public user: User;

  constructor (_session: SessionService) {
    this._session = _session;
  }

  public signOut () {
    localStorage.removeItem('token');
  }

}
