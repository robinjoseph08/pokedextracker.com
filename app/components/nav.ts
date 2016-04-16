import { Component }    from 'angular2/core';
import { RouterLink }   from 'angular2/router';
import { Angulartics2 } from 'angulartics2';

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

  private _angulartics: Angulartics2;

  constructor (_angulartics: Angulartics2, _session: SessionService) {
    this._angulartics = _angulartics;
    this._session = _session;
  }

  public signOut () {
    localStorage.removeItem('token');

    this._angulartics.eventTrack.next({
      action: 'sign out',
      properties: { category: 'Session' }
    });
  }

}
