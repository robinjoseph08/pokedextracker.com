import { Component } from 'angular2/core';

import { CapitalizePipe } from '../pipes/capitalize';
import { Evolution }      from '../classes/evolution';

const HTML = require('../views/evolutions.html');

@Component({
  inputs: ['evolutions'],
  pipes: [CapitalizePipe],
  selector: 'evolutions',
  template: HTML
})
export class EvolutionsComponent {

  public evolutions: Evolution[];

}
