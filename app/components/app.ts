import { Component }                 from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { RegisterComponent } from './register';
import { TrackerComponent }  from './tracker';

@Component({
  directives: [RouterOutlet],
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { component: HomeComponent,     name: 'Home',     path: '/' },
  { component: LoginComponent,    name: 'Login',    path: '/login' },
  { component: RegisterComponent, name: 'Register', path: '/register' },
  { component: TrackerComponent,  name: 'Tracker',  path: '/u/:username' }
])
export class AppComponent {}
