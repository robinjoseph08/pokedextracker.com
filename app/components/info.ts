import { Component, EventEmitter } from 'angular2/core';
import { DecimalPipe }             from 'angular2/common';

import { Capture }                  from '../classes/capture';
import { EvolutionFamilyComponent } from './evolution-family';

const HTML = require('../views/info.html');

@Component({
  directives: [EvolutionFamilyComponent],
  events: ['collapsedChange'],
  inputs: ['active', 'collapsed'],
  pipes: [DecimalPipe],
  selector: 'info',
  template: HTML
})
export class InfoComponent {

  public collapsedChange = new EventEmitter<boolean>();

  public get active (): Capture {
    return this._active;
  }

  public set active (active: Capture) {
    this._active = active;
    if (!active.pokemon.bulbapedia_url) {
      active.loadPokemon();
    }
  }

  private _active: Capture;

}
