import { Component }                 from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { HomeComponent }    from './home';
import { NavComponent }     from './nav';
import { TrackerComponent } from './tracker';

const HTML = require('../views/app.html');

@Component({
  directives: [NavComponent, RouterOutlet],
  selector: 'app',
  template: HTML
})
@RouteConfig([
  { component: HomeComponent,    name: 'Home',    path: '/' },
  { component: TrackerComponent, name: 'Tracker', path: '/tracker' }
])
export class AppComponent {}
