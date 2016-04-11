import { Component } from 'angular2/core';

import { EvolutionsComponent } from './evolutions';
import { EvolutionFamily }     from '../classes/evolution-family';

const HTML = require('../views/evolution-family.html');

@Component({
  directives: [EvolutionsComponent],
  inputs: ['family'],
  selector: 'evolution-family',
  template: HTML
})
export class EvolutionFamilyComponent {

  public family: EvolutionFamily;

}
