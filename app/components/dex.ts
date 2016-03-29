import { Component, EventEmitter } from 'angular2/core';

import { BoxComponent }    from './box';
import { Capture }         from '../classes/capture';
import { GroupPipe }       from '../pipes/group';
import { HeaderComponent } from './header';
import { User }            from '../classes/user';

const HTML = require('../views/dex.html');

@Component({
  directives: [HeaderComponent, BoxComponent],
  events: ['activeChange'],
  inputs: ['captures', 'user'],
  pipes: [GroupPipe],
  selector: 'dex',
  template: HTML
})
export class DexComponent {

  public captures: Capture[];
  public user: User;

  public activeChange = new EventEmitter<Capture>();

}
