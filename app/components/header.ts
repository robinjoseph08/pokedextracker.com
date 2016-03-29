import { Component, EventEmitter } from 'angular2/core';

import { Capture } from '../classes/capture';
import { User }    from '../classes/user';

const HTML = require('../views/header.html');

@Component({
  events: ['regionChange'],
  inputs: ['captures', 'region', 'user'],
  selector: 'header',
  template: HTML
})
export class HeaderComponent {

  public captures: Capture[];
  public dropdown: boolean = false;
  public region: string;
  public regions: string[] = ['national', 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos'];
  public user: User;

  public regionChange = new EventEmitter<string>();

  public get caught () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region) && capture.captured).length;
  }

  public get total () {
    return this.captures.filter((capture) => capture.pokemon.is(this.region)).length;
  }

}
