import { Component, EventEmitter } from 'angular2/core';
import { DecimalPipe }             from 'angular2/common';

import { Capture }          from '../classes/capture';
import { CaptureService }   from '../services/capture';
import { PokemonComponent } from './pokemon';
import { SessionService }   from '../services/session';
import { User }             from '../classes/user';

const HTML = require('../views/box.html');

@Component({
  directives: [PokemonComponent],
  events: ['activeChange', 'collapsedChange'],
  inputs: ['captures', 'region', 'user'],
  pipes: [DecimalPipe],
  providers: [CaptureService, SessionService],
  selector: 'box',
  template: HTML
})
export class BoxComponent {

  public captures: Capture[];
  public loading: boolean = false;
  public region: string;
  public _session: SessionService;
  public user: User;

  public activeChange = new EventEmitter<Capture>();
  public collapsedChange = new EventEmitter<boolean>();

  private boxSize = 30;
  private _capture: CaptureService;

  public get uncaught (): number {
    return this.captures.reduce((uncaught, capture) => uncaught + (capture.captured ? 0 : 1), 0);
  }

  public get empties (): Object[] {
    return new Array(this.boxSize - this.captures.length);
  }

  constructor (_capture: CaptureService, _session: SessionService) {
    this._capture = _capture;
    this._session = _session;
  }

  public toggle () {
    const payload = { pokemon: this.captures.map((capture) => capture.pokemon.national_id) };
    this.loading = true;

    if (this.uncaught === 0) {
      this._capture.delete(payload)
      .then(() => this.captures.map((capture) => capture.captured = false))
      .then(() => this.loading = false);
    } else {
      this._capture.create(payload)
      .then(() => this.captures.map((capture) => capture.captured = true))
      .then(() => this.loading = false);
    }
  }

}
