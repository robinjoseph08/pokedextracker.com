import { Component }                   from 'angular2/core';
import { RouteConfig, RouterOutlet }   from 'angular2/router';
import { Angulartics2 }                from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';

import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { RegisterComponent } from './register';
import { TrackerComponent }  from './tracker';
import { NotFoundComponent } from './not-found';

@Component({
  directives: [RouterOutlet],
  providers: [Angulartics2GoogleAnalytics],
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { component: HomeComponent,     name: 'Home',     path: '/' },
  { component: LoginComponent,    name: 'Login',    path: '/login' },
  { component: RegisterComponent, name: 'Register', path: '/register' },
  { component: TrackerComponent,  name: 'Tracker',  path: '/u/:username' },
  { component: NotFoundComponent, name: 'NotFound', path: '/**' }
])
export class AppComponent {

  private _angulartics: Angulartics2;
  private _ga: Angulartics2GoogleAnalytics;

  constructor(_angulartics: Angulartics2, _ga: Angulartics2GoogleAnalytics) {
    this._angulartics = _angulartics;
    this._ga = _ga;
  }

}
