import { Component } from 'angular2/core';

import { User } from '../classes/user';

const HTML = require('../views/header.html');

@Component({
  inputs: ['user'],
  selector: 'header',
  template: HTML
})
export class HeaderComponent {

  public user: User;

}
