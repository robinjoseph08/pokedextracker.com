import 'es6-shim';
import 'reflect-metadata';
import 'rxjs';
import './styles';

import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode }                       from '@angular/core';
import { HTTP_PROVIDERS }                       from '@angular/http';
import { ROUTER_PROVIDERS }                     from '@angular/router-deprecated';
import { Angulartics2 }                         from 'angulartics2';

import { ApiService }   from './services/api';
import { AppComponent } from './components/app';
import { Config }       from '../config';

if (Config.ENABLE_PRODUCTION) {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  Angulartics2,
  ApiService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]);
