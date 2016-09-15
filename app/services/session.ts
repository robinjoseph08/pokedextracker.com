import { Injectable } from 'angular2/core';

import { ApiService } from './api';
import { Session }    from '../classes/session';
import { User }       from '../classes/user';

@Injectable()
export class SessionService {

  public get user (): User {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return new User(JSON.parse(atob(token.split('.')[1])));
  }

  private _api: ApiService;

  constructor (_api: ApiService) {
    this._api = _api;
  }

  public create (payload: Object): Promise<Session> {
    return this._api.post('/sessions', payload)
    .then((session) => new Session(session));
  }

}
