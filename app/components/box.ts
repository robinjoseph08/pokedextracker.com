import { Component, EventEmitter } from 'angular2/core';

import { NumberPipe }       from '../pipes/number';
import { Pokemon }          from '../classes/pokemon';
import { PokemonComponent } from './pokemon';

const HTML = require('../views/box.html');

@Component({
  directives: [PokemonComponent],
  events: ['pokemonHover'],
  inputs: ['pokemon'],
  pipes: [NumberPipe],
  selector: 'box',
  template: HTML
})
export class BoxComponent {

  public pokemon: Pokemon[];

  public pokemonHover = new EventEmitter<Pokemon>();

  private boxSize = 30;

  public get empties (): Object[] {
    return new Array(this.boxSize - this.pokemon.length);
  }

}
