import { Component, EventEmitter } from 'angular2/core';

import { Capture }    from '../classes/capture';
import { NumberPipe } from '../pipes/number';

const HTML = require('../views/info.html');

@Component({
  events: ['collapsedChange'],
  inputs: ['active', 'collapsed'],
  pipes: [NumberPipe],
  selector: 'info',
  template: HTML
})
export class InfoComponent {

  public active: Capture;

  public collapsedChange = new EventEmitter<boolean>();

}
