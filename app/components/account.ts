import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Title }             from '@angular/platform-browser';
import { Angulartics2 }      from 'angulartics2';

import { NavComponent }    from './nav';
import { ReloadComponent } from './reload';
import { SessionService }  from '../services/session';
import { User }            from '../classes/user';
import { UserService }     from '../services/user';
import { VersionService }  from '../services/version';

const HTML = require('../views/account.html');

@Component({
  directives: [NavComponent, ReloadComponent],
  providers: [SessionService, Title, UserService, VersionService],
  selector: 'account',
  template: HTML
})
export class AccountComponent implements OnInit {

  public error: string = null;
  public loading: boolean = false;
  public password: boolean = false;
  public success: boolean = false;
  public _session: SessionService;
  public user: User;
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
    if (!this._session.user) {
      return this._router.navigate(['Login']);
    }

    this.reset();
    this._version.check();

    this._title.setTitle('Account | Pokédex Tracker');
  }

  public togglePassword () {
    this.password = !this.password;

    if (!this.password) {
      delete this.user.password;
      delete this.user.password_confirm;
    }
  }

  public updateUser (payload: User) {
    this.error = null;
    this.success = false;

    if (payload.password !== payload.password_confirm) {
      return this.error = 'passwords need to match';
    }

    this.loading = true;

    this._user.update(payload)
    .then((session) => {
      this.loading = false;
      this.success = true;
      localStorage.setItem('token', session.token);

      this.reset();

      this._angulartics.eventTrack.next({
        action: 'update',
        properties: { category: 'User' }
      });
    })
    .catch((err) => {
      this.loading = false;
      this.error = err.message;
    });
  }

  private reset () {
    this.user = new User({ friend_code: this._session.user.friend_code });
    this.password = false;
  }

}
