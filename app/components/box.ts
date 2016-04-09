import { Component, EventEmitter } from 'angular2/core';

import { Capture }          from '../classes/capture';
import { NumberPipe }       from '../pipes/number';
import { PokemonComponent } from './pokemon';
import { SessionService }   from '../services/session';
import { User }             from '../classes/user';

const HTML = require('../views/box.html');

@Component({
  directives: [PokemonComponent],
  events: ['activeChange', 'collapsedChange'],
  inputs: ['captures', 'region', 'user'],
  pipes: [NumberPipe],
  providers: [SessionService],
  selector: 'box',
  template: HTML
})
export class BoxComponent {

  public captures: Capture[];
  public region: string;
  public _session: SessionService;
  public user: User;

  public activeChange = new EventEmitter<Capture>();
  public collapsedChange = new EventEmitter<boolean>();

  private boxSize = 30;

  public get empties (): Object[] {
    return new Array(this.boxSize - this.captures.length);
  }

  constructor (_session: SessionService) {
    this._session = _session;
  }

}
