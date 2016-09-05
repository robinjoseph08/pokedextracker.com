import { Component, EventEmitter } from '@angular/core';

import { EvolutionsComponent } from './evolutions';
import { EvolutionFamily }     from '../classes/evolution-family';
import { Pokemon }             from '../classes/pokemon';

const HTML = require('../views/evolution-family.html');

@Component({
  directives: [EvolutionsComponent],
  inputs: ['family'],
  outputs: ['activeChange'],
  selector: 'evolution-family',
  template: HTML
})
export class EvolutionFamilyComponent {

  public family: EvolutionFamily;

  public activeChange = new EventEmitter<Pokemon>();

}
