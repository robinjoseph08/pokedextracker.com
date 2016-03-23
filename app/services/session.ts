import { Injectable } from 'angular2/core';

import { User } from '../classes/user';

@Injectable()
export class SessionService {

  public get loggedIn (): boolean {
    return Boolean(localStorage.getItem('token'));
  }

  public get user (): User {
    if (!this.loggedIn) {
      return null;
    }
    const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

    return new User(payload);
  }

}
