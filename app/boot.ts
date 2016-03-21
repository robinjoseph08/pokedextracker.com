import 'es6-shim';
import 'reflect-metadata';
import 'rxjs';
import './styles';

import { bootstrap }        from 'angular2/bootstrap';
import { HTTP_PROVIDERS }   from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';

import { AppComponent } from './components/app';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]);
