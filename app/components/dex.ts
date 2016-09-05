import { Component, ElementRef, EventEmitter } from '@angular/core';

import { BoxComponent }    from './box';
import { Capture }         from '../classes/capture';
import { GroupPipe }       from '../pipes/group';
import { HeaderComponent } from './header';
import { User }            from '../classes/user';

const HTML = require('../views/dex.html');

@Component({
  directives: [HeaderComponent, BoxComponent],
  events: ['activeChange', 'collapsedChange', 'scrollUp'],
  inputs: ['captures', 'showScroll', 'user'],
  pipes: [GroupPipe],
  selector: 'dex',
  template: HTML
})
export class DexComponent {

  public captures: Capture[];
  public _el: ElementRef;
  public region: string = 'national';
  public showScroll: boolean;
  public user: User;

  public activeChange = new EventEmitter<Capture>();
  public collapsedChange = new EventEmitter<boolean>();
  public scrollUp = new EventEmitter<void>();

  constructor (_el: ElementRef) {
    this._el = _el;
  }

}
