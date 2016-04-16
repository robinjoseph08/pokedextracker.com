import 'es6-shim';
import 'reflect-metadata';
import 'rxjs';
import './styles';

import { bootstrap }        from 'angular2/bootstrap';
import { enableProdMode }   from 'angular2/core';
import { HTTP_PROVIDERS }   from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { Angulartics2 }     from 'angulartics2';

import { ApiService }   from './services/api';
import { AppComponent } from './components/app';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  Angulartics2,
  ApiService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]);
