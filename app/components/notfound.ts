import { Component } from 'angular2/core';

import { NavComponent }   from './nav';

const HTML = require('../views/notfound.html');

@Component({
  directives: [NavComponent],
  selector: 'notfound',
  template: HTML
})
export class NotFoundComponent {

}
