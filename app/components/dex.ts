import { Component } from 'angular2/core';

import { BoxComponent }    from './box';
import { HeaderComponent } from './header';

const HTML = require('../views/dex.html');

@Component({
  directives: [HeaderComponent, BoxComponent],
  selector: 'dex',
  template: HTML
})
export class DexComponent {}
