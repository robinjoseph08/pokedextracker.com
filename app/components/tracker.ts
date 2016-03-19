import { Component } from 'angular2/core';
import { Title }     from 'angular2/platform/browser';

import { DexComponent }  from './dex';
import { InfoComponent } from './info';

const HTML = require('../views/tracker.html');

@Component({
  directives: [DexComponent, InfoComponent],
  providers: [Title],
  selector: 'tracker',
  template: HTML
})
export class TrackerComponent {

  constructor (_title: Title) {
    _title.setTitle('My Pokédex Tracker');
  }

}
