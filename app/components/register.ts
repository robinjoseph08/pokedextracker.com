import { Component, OnInit }  from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { Title }              from '@angular/platform-browser';
import { Angulartics2 }       from 'angulartics2';

import { NavComponent }    from './nav';
import { ReloadComponent } from './reload';
import { SessionService }  from '../services/session';
import { User }            from '../classes/user';
import { UserService }     from '../services/user';
import { VersionService }  from '../services/version';

const HTML = require('../views/register.html');

@Component({
  directives: [NavComponent, ReloadComponent, RouterLink],
  providers: [SessionService, Title, UserService, VersionService],
  selector: 'register',
  template: HTML
})
export class RegisterComponent implements OnInit {

  public error: string = null;
  public _session: SessionService;
  public user: User = new User({});
  public _version: VersionService;

  private _angulartics: Angulartics2;
  private _router: Router;
  private _title: Title;
  private _user: UserService;

  constructor (_angulartics: Angulartics2, _router: Router, _session: SessionService, _title: Title, _user: UserService, _version: VersionService) {
    this._angulartics = _angulartics;
    this._router = _router;
    this._session = _session;
    this._title = _title;
    this._user = _user;
    this._version = _version;
  }

  public ngOnInit () {
    if (this._session.user) {
      return this._router.navigate(['Tracker', { username: this._session.user.username }]);
    }

    this._version.check();

    this._title.setTitle('Register | Pokédex Tracker');
  }

  public createUser (payload: User) {
    this.error = null;

    if (payload.password !== payload.password_confirm) {
      return this.error = 'passwords need to match';
    }

    payload.referrer = document.referrer;

    this._user.create(payload)
    .then((session) => {
      localStorage.setItem('token', session.token);

      this._angulartics.eventTrack.next({
        action: 'register',
        properties: { category: 'Session' }
      });
    })
    .then(() => this._router.navigate(['Tracker', { username: this._session.user.username }]))
    .catch((err) => this.error = err.message);
  }

}
