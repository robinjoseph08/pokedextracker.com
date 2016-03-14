import { Component }                 from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { HomeComponent } from './home';

@Component({
  directives: [RouterOutlet],
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { component: HomeComponent, name: 'Home', path: '/' }
])
export class AppComponent {}
