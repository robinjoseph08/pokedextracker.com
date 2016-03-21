import { Component } from 'angular2/core';

import { NumberPipe } from '../pipes/number';
import { Pokemon }    from '../classes/pokemon';

const HTML = require('../views/info.html');

@Component({
  inputs: ['pokemon'],
  pipes: [NumberPipe],
  selector: 'info',
  template: HTML
})
export class InfoComponent {

  public pokemon: Pokemon;

}
