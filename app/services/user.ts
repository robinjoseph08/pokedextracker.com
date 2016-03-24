import { Injectable } from 'angular2/core';

import { ApiService } from './api';
import { Session }    from '../classes/session';
import { User }       from '../classes/user';

@Injectable()
export class UserService {

  private _api: ApiService;

  constructor (_api: ApiService) {
    this._api = _api;
  }

  public retrieve (username: string): Promise<User> {
    return this._api.get(`/users/${username}`)
    .then((user) => new User(user));
  }

  public create (payload: Object): Promise<Session> {
    return this._api.post('/users', payload)
    .then((session) => new Session(session));
  }

}
