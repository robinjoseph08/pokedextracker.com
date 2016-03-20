import { Component } from 'angular2/core';

import { PokemonComponent } from './pokemon';

const HTML = require('../views/box.html');

@Component({
  directives: [PokemonComponent],
  selector: 'box',
  template: HTML
})
export class BoxComponent {}
