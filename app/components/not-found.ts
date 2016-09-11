import { Component, OnInit } from 'angular2/core';
import { Title }             from 'angular2/platform/browser';

import { NavComponent }   from './nav';
import { SessionService } from '../services/session';

const HTML = require('../views/not-found.html');

@Component({
  directives: [NavComponent],
  providers: [SessionService, Title],
  selector: 'not-found',
  template: HTML
})
export class NotFoundComponent implements OnInit {

  public _session: SessionService;

  private _title: Title;

  constructor (_session: SessionService, _title: Title) {
    this._session = _session;
    this._title = _title;
  }

  public ngOnInit () {
    this._title.setTitle('404 Not Found | Pokédex Tracker');
  }

}
