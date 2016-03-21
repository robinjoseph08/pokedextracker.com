import { Component } from 'angular2/core';

import { BoxComponent }    from './box';
import { GroupPipe }       from '../pipes/group';
import { HeaderComponent } from './header';
import { Pokemon }         from '../classes/pokemon';

const HTML = require('../views/dex.html');

@Component({
  directives: [HeaderComponent, BoxComponent],
  inputs: ['pokemon'],
  pipes: [GroupPipe],
  selector: 'dex',
  template: HTML
})
export class DexComponent {

  public pokemon: Pokemon[];

}
