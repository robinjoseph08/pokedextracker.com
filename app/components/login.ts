import { Component, OnInit }  from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { Title }              from '@angular/platform-browser';
import { Angulartics2 }       from 'angulartics2';

import { NavComponent }    from './nav';
import { ReloadComponent } from './reload';
import { SessionService }  from '../services/session';
import { User }            from '../classes/user';
import { VersionService }  from '../services/version';

const HTML = require('../views/login.html');

@Component({
  directives: [NavComponent, ReloadComponent, RouterLink],
  providers: [SessionService, Title, VersionService],
  selector: 'login',
  template: HTML
})
export class LoginComponent implements OnInit {

  public error: string = null;
  public _session: SessionService;
  public user: User = new User({});
  public _version: VersionService;

  private _angulartics: Angulartics2;
  private _router: Router;
  private _title: Title;

  constructor (_angulartics: Angulartics2, _router: Router, _session: SessionService, _title: Title, _version: VersionService) {
    this._angulartics = _angulartics;
    this._router = _router;
    this._session = _session;
    this._title = _title;
    this._version = _version;
  }

  public ngOnInit () {
    if (this._session.user) {
      return this._router.navigate(['Tracker', { username: this._session.user.username }]);
    }

    this._version.check();

    this._title.setTitle('Login | Pokédex Tracker');
  }

  public createSession (payload: User) {
    this.error = null;

    this._session.create(payload)
    .then((session) => {
      localStorage.setItem('token', session.token);

      this._angulartics.eventTrack.next({
        action: 'login',
        properties: { category: 'Session' }
      });
    })
    .then(() => this._router.navigate(['Tracker', { username: this._session.user.username }]))
    .catch((err) => this.error = err.message);
  }

}
