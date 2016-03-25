import { Component, OnInit } from 'angular2/core';
import { RouteParams }       from 'angular2/router';
import { Title }             from 'angular2/platform/browser';

import { Capture }        from '../classes/capture';
import { CaptureService } from '../services/capture';
import { DexComponent }   from './dex';
import { InfoComponent }  from './info';
import { NavComponent }   from './nav';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';
import { UserService }    from '../services/user';

const HTML = require('../views/tracker.html');

@Component({
  directives: [DexComponent, InfoComponent, NavComponent],
  providers: [CaptureService, SessionService, Title, UserService],
  selector: 'tracker',
  template: HTML
})
export class TrackerComponent implements OnInit {

  public active: Capture;
  public captures: Capture[] = [];
  public loading: boolean = true;
  public _session: SessionService;
  public user: User;

  private _capture: CaptureService;
  private _routeParams: RouteParams;
  private _title: Title;
  private _user: UserService;

  constructor (_capture: CaptureService, _routeParams: RouteParams, _session: SessionService, _title: Title, _user: UserService) {
    this._capture = _capture;
    this._routeParams = _routeParams;
    this._session = _session;
    this._title = _title;
    this._user = _user;
  }

  public ngOnInit () {
    this._user.retrieve(this._routeParams.get('username'))
    .then((user) => {
      this._title.setTitle(`${this._routeParams.get('username')}'s Pokédex Tracker`);

      this.user = user;

      return this._capture.list({ user: user.id });
    })
    .then((captures) => {
      this.captures = captures;
      this.active = captures[0];
      this.loading = false;
    });
  }

}
