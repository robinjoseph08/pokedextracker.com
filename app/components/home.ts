import { Component } from 'angular2/core';
import { Title }     from 'angular2/platform/browser';

const HTML = require('../views/home.html');

@Component({
  providers: [Title],
  selector: 'home',
  template: HTML
})
export class HomeComponent {

  constructor (_title: Title) {
    _title.setTitle('Pokédex Tracker');
  }

}
