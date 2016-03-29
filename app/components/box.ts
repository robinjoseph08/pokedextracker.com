import { Component, EventEmitter } from 'angular2/core';

import { Capture }          from '../classes/capture';
import { NumberPipe }       from '../pipes/number';
import { PokemonComponent } from './pokemon';

const HTML = require('../views/box.html');

@Component({
  directives: [PokemonComponent],
  events: ['activeChange'],
  inputs: ['captures', 'region'],
  pipes: [NumberPipe],
  selector: 'box',
  template: HTML
})
export class BoxComponent {

  public captures: Capture[];
  public region: string;

  public activeChange = new EventEmitter<Capture>();

  private boxSize = 30;

  public get empties (): Object[] {
    return new Array(this.boxSize - this.captures.length);
  }

}
