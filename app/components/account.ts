import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Title }             from '@angular/platform-browser';

import { NavComponent }   from './nav';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';

const HTML = require('../views/account.html');

@Component({
  directives: [NavComponent],
  providers: [SessionService, Title],
  inputs: ['user'],
  selector: 'account',
  template: HTML
})
export class AccountComponent implements OnInit {

  public error: string = null;
  public _session: SessionService;
  public user: User;

  private _router: Router;
  private _title: Title;

  constructor (_router: Router, _session: SessionService, _title: Title) {
    this._router = _router;
    this._session = _session;
    this._title = _title;
  }

  public ngOnInit () {
    if (!this._session.user) {
      return this._router.navigate(['Login']);
    }

    this.user = new User(this._session.user);

    this._title.setTitle('Account | Pokédex Tracker');
  }

}
