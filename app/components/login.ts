import { Component }  from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { Title }      from 'angular2/platform/browser';

const HTML = require('../views/login.html');

@Component({
  directives: [RouterLink],
  providers: [Title],
  selector: 'login',
  template: HTML
})
export class LoginComponent {

  constructor (_title: Title) {
    _title.setTitle('Pokédex Tracker');
  }

}
