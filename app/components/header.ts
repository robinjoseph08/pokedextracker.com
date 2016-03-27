import { Component } from 'angular2/core';

import { Capture } from '../classes/capture';
import { User }    from '../classes/user';

const HTML = require('../views/header.html');

@Component({
  inputs: ['captures', 'user'],
  selector: 'header',
  template: HTML
})
export class HeaderComponent {

  public captures: Capture[];
  public dropdown: boolean = false;
  public user: User;

  public get caught () {
    return this.captures.filter((capture) => capture.captured).length;
  }

}
