import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Title }             from '@angular/platform-browser';

import { NavComponent }   from './nav';
import { SessionService } from '../services/session';

const HTML = require('../views/account.html');

@Component({
  directives: [NavComponent],
  providers: [SessionService, Title],
  selector: 'account',
  template: HTML
})
export class AccountComponent implements OnInit {

  public error: string = null;
  public _session: SessionService;

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

    this._title.setTitle('Account | Pokédex Tracker');
  }

}
