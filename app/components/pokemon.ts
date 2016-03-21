import { Component } from 'angular2/core';

import { NumberPipe } from '../pipes/number';
import { Pokemon }    from '../classes/pokemon';

const HTML = require('../views/pokemon.html');

@Component({
  inputs: ['pokemon'],
  pipes: [NumberPipe],
  selector: 'pokemon',
  template: HTML
})
export class PokemonComponent {

  public pokemon: Pokemon;

}
