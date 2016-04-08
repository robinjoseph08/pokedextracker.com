import { Component, EventEmitter } from 'angular2/core';
import { DecimalPipe }             from 'angular2/common';

import { Capture }    from '../classes/capture';

const HTML = require('../views/info.html');

@Component({
  events: ['collapsedChange'],
  inputs: ['active', 'collapsed'],
  pipes: [DecimalPipe],
  selector: 'info',
  template: HTML
})
export class InfoComponent {

  public active: Capture;

  public collapsedChange = new EventEmitter<boolean>();

}
