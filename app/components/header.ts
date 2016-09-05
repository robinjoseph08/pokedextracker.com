import { Component, EventEmitter } from '@angular/core';
import { PercentPipe }             from '@angular/common';
import { RouterLink }              from '@angular/router-deprecated';
import { Angulartics2On }          from 'angulartics2';

import { CapitalizePipe }    from '../pipes/capitalize';
import { Capture }           from '../classes/capture';
import { OffClickDirective } from '../directives/off-click';
import { SessionService }    from '../services/session';
import { User }              from '../classes/user';

const HTML = require('../views/header.html');

@Component({
  directives: [Angulartics2On, OffClickDirective, RouterLink],
  events: ['regionChange'],
  inputs: ['captures', 'region', 'user'],
  pipes: [CapitalizePipe, PercentPipe],
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
  public showLink: boolean = false;
  public user: User;

  public regionChange = new EventEmitter<string>();

  constructor (_session: SessionService) {
    this._session = _session;

    this.closeRegion = this.closeRegion.bind(this);
    this.closeShare = this.closeShare.bind(this);
  }

  public get caught () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region) && capture.captured).length;
  }

  public get total () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region)).length;
  }

  public closeRegion () {
    this.dropdown = false;
  }

  public closeShare () {
    this.showLink = false;
  }

}
