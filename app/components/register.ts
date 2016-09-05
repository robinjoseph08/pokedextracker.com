import { Component, OnInit }  from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { Title }              from '@angular/platform-browser';
import { Angulartics2 }       from 'angulartics2';

import { NavComponent }   from './nav';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';
import { UserService }    from '../services/user';

const HTML = require('../views/register.html');

@Component({
  directives: [NavComponent, RouterLink],
  providers: [SessionService, Title, UserService],
  selector: 'register',
  template: HTML
})
export class RegisterComponent implements OnInit {

  public error: string = null;
  public _session: SessionService;
  public user: User = new User({});

  private _angulartics: Angulartics2;
  private _router: Router;
  private _title: Title;
  private _user: UserService;

  constructor (_angulartics: Angulartics2, _router: Router, _session: SessionService, _title: Title, _user: UserService) {
    this._angulartics = _angulartics;
    this._router = _router;
    this._session = _session;
    this._title = _title;
    this._user = _user;
  }

  public ngOnInit () {
    if (this._session.user) {
      return this._router.navigate(['Tracker', { username: this._session.user.username }]);
    }

    this._title.setTitle('Register | Pokédex Tracker');
  }

  public createUser (payload: User) {
    if (payload.password === payload.password_confirm) {
      this.error = null;
    } else {
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
