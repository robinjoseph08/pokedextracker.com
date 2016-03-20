import 'es6-shim';
import 'reflect-metadata';
import 'rxjs';
import './styles';

import { bootstrap }        from 'angular2/bootstrap';
import { ROUTER_PROVIDERS } from 'angular2/router';

import { AppComponent } from './components/app';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);
