import { Component } from 'angular2/core';
import { Title }     from 'angular2/platform/browser';

const HTML = require('../views/register.html');

@Component({
  providers: [Title],
  selector: 'register',
  template: HTML
})
export class RegisterComponent {

  constructor (_title: Title) {
    _title.setTitle('Pokédex Tracker');
  }

}
