import { Injectable } from 'angular2/core';

import { User } from '../classes/user';

@Injectable()
export class SessionService {

  public get user (): User {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return new User(JSON.parse(atob(token.split('.')[1])));
  }

}
