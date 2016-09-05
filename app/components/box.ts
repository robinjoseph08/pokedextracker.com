import { Component, EventEmitter } from '@angular/core';
import { DecimalPipe }             from '@angular/common';
import { Angulartics2 }            from 'angulartics2';

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

  private _angulartics: Angulartics2;
  private boxSize = 30;
  private _capture: CaptureService;

  public get uncaught (): number {
    return this.captures.reduce((uncaught, capture) => uncaught + (capture.captured ? 0 : 1), 0);
  }

  public get empties (): Object[] {
    return new Array(this.boxSize - this.captures.length);
  }

  constructor (_angulartics: Angulartics2, _capture: CaptureService, _session: SessionService) {
    this._angulartics = _angulartics;
    this._capture = _capture;
    this._session = _session;
  }

  public toggle () {
    const payload = { pokemon: this.captures.map((capture) => capture.pokemon.national_id) };
    const markAll = this.uncaught !== 0;
    this.loading = true;

    Promise.resolve()
    .then(() => {
      if (markAll) {
        this._capture.create(payload);
      } else {
        this._capture.delete(payload);
      }
    })
    .then(() => {
      const pipe = new DecimalPipe();
      const args = '3.0';

      this.captures.map((capture) => capture.captured = markAll);
      this._angulartics.eventTrack.next({
        action: markAll ? 'mark all' : 'unmark all',
        properties: {
          category: 'Box',
          label: `${pipe.transform(this.captures[0].pokemon.national_id, args)} - ${pipe.transform(this.captures[this.captures.length - 1].pokemon.national_id, args)}`
        }
      });
      this.loading = false;
    });
  }

}
