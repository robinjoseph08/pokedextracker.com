import { Component, OnInit }  from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { Title }              from 'angular2/platform/browser';

import { NavComponent }   from './nav';
import { SessionService } from '../services/session';

const HTML = require('../views/login.html');

@Component({
  directives: [NavComponent, RouterLink],
  providers: [SessionService, Title],
  selector: 'login',
  template: HTML
})
export class LoginComponent implements OnInit {

  public _session: SessionService;

  private _router: Router;
  private _title: Title;

  constructor (_router: Router, _session: SessionService, _title: Title) {
    this._router = _router;
    this._session = _session;
    this._title = _title;
  }

  public ngOnInit () {
    if (this._session.user) {
      return this._router.navigate(['Tracker', { username: this._session.user.username }]);
    }

    this._title.setTitle('Login | Pokédex Tracker');
  }

}
