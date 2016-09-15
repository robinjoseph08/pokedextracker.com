import { Component }          from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { Angulartics2 }       from 'angulartics2';

import { SessionService } from '../services/session';
import { User }           from '../classes/user';

const HTML = require('../views/nav.html');

@Component({
  directives: [RouterLink],
  inputs: ['user'],
  providers: [Location, SessionService],
  selector: 'nav',
  template: HTML
})
export class NavComponent {

  public _session: SessionService;
  public user: User;

  private _angulartics: Angulartics2;
  private _router: Router;

  constructor (_angulartics: Angulartics2, _router: Router, _session: SessionService) {
    this._angulartics = _angulartics;
    this._router = _router;
    this._session = _session;
  }

  public signOut () {
    localStorage.removeItem('token');

    this._angulartics.eventTrack.next({
      action: 'sign out',
      properties: { category: 'Session' }
    });

    if (this._router.root.isRouteActive(this._router.generate(['Account']))) {
      this._router.navigate(['Login']);
    }
  }

}
