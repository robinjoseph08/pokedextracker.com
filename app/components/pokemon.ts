import { Component, EventEmitter } from 'angular2/core';

import { Capture }        from '../classes/capture';
import { CaptureService } from '../services/capture';
import { NumberPipe }     from '../pipes/number';
import { SessionService } from '../services/session';

const HTML = require('../views/pokemon.html');

@Component({
  events: ['activeChange', 'collapsedChange'],
  inputs: ['capture', 'region'],
  pipes: [NumberPipe],
  selector: 'pokemon',
  template: HTML
})
export class PokemonComponent {

  public capture: Capture;
  public region: string;

  public activeChange = new EventEmitter<Capture>();
  public collapsedChange = new EventEmitter<boolean>();

  private _capture: CaptureService;
  private _session: SessionService;

  constructor (_capture: CaptureService, _session: SessionService) {
    this._capture = _capture;
    this._session = _session;
  }

  public toggle () {
    if (!this._session.user || !this.capture.pokemon.is(this.region) || this._session.user.id !== this.capture.user_id) {
      return;
    }

    const payload = { pokemon: this.capture.pokemon.national_id };

    if (this.capture.captured) {
      this._capture.delete(payload)
      .then(() => this.capture.captured = false);
    } else {
      this._capture.create(payload)
      .then(() => this.capture.captured = true);
    }
  }

}
