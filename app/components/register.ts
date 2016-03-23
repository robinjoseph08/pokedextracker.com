import { Component }          from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { Title }              from 'angular2/platform/browser';

import { User }        from '../classes/user';
import { UserService } from '../services/user';

const HTML = require('../views/register.html');

@Component({
  directives: [RouterLink],
  providers: [Title, UserService],
  selector: 'register',
  template: HTML
})
export class RegisterComponent {

  public error: string = null;
  public user: User = new User({});

  private _router: Router;
  private _user: UserService;

  constructor (_router: Router, _title: Title, _user: UserService) {
    this._router = _router;
    this._user = _user;
    _title.setTitle('Pokédex Tracker');
  }

  public createUser (payload: User) {
    if (payload.password === payload.password_confirm) {
      this.error = null;
    } else {
      return this.error = 'passwords need to match';
    }

    this._user.create(payload)
    .then((session) => localStorage.setItem('token', session.token))
    .then(() => this._router.navigate(['Home']))
    .catch((err) => this.error = err.message);
  }

}
