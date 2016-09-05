import { Component, EventEmitter }      from '@angular/core';
import { DecimalPipe }                  from '@angular/common';
import { Angulartics2, Angulartics2On } from 'angulartics2';

import { Capture }        from '../classes/capture';
import { CaptureService } from '../services/capture';
import { SessionService } from '../services/session';

const HTML = require('../views/pokemon.html');

@Component({
  directives: [Angulartics2On],
  events: ['activeChange', 'collapsedChange'],
  inputs: ['capture', 'region'],
  pipes: [DecimalPipe],
  providers: [SessionService],
  selector: 'pokemon',
  template: HTML
})
export class PokemonComponent {

  public capture: Capture;
  public region: string;

  public activeChange = new EventEmitter<Capture>();
  public collapsedChange = new EventEmitter<boolean>();

  private _angulartics: Angulartics2;
  private _capture: CaptureService;
  private _session: SessionService;

  constructor (_angulartics: Angulartics2, _capture: CaptureService, _session: SessionService) {
    this._angulartics = _angulartics;
    this._capture = _capture;
    this._session = _session;
  }

  public toggle () {
    if (!this._session.user || !this.capture.pokemon.is(this.region) || this._session.user.id !== this.capture.user_id) {
      return;
    }

    const payload = { pokemon: this.capture.pokemon.national_id };

    Promise.resolve()
    .then(() => {
      if (this.capture.captured) {
        this._capture.delete(payload);
      } else {
        this._capture.create(payload);
      }
    })
    .then(() => {
      this.capture.captured = !this.capture.captured;
      this._angulartics.eventTrack.next({
        action: this.capture.captured ? 'mark' : 'unmark',
        properties: {
          category: 'Pokemon',
          label: this.capture.pokemon.name
        }
      });
    });
  }

}
