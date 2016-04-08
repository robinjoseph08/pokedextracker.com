import { Component, EventEmitter } from 'angular2/core';
import { PercentPipe }             from 'angular2/common';

import { Capture }        from '../classes/capture';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';

const HTML = require('../views/header.html');

@Component({
  events: ['regionChange'],
  inputs: ['captures', 'region', 'user'],
  pipes: [PercentPipe],
  providers: [SessionService],
  selector: 'header',
  template: HTML
})
export class HeaderComponent {

  public captures: Capture[];
  public dropdown: boolean = false;
  public region: string;
  public regions: string[] = ['national', 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos'];
  public _session: SessionService;
  public user: User;

  public regionChange = new EventEmitter<string>();

  constructor (_session: SessionService) {
    this._session = _session;
  }

  public get caught () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region) && capture.captured).length;
  }

  public get total () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region)).length;
  }

}
