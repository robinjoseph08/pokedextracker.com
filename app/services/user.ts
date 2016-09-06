import { Injectable } from '@angular/core';

import { ApiService }     from './api';
import { Session }        from '../classes/session';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';

@Injectable()
export class UserService {

  private _api: ApiService;
  private _session: SessionService;

  constructor (_api: ApiService, _session: SessionService) {
    this._api = _api;
    this._session = _session;
  }

  public retrieve (username: string): Promise<User> {
    return this._api.get(`/users/${username}`)
    .then((user) => new User(user));
  }

  public create (payload: Object): Promise<Session> {
    return this._api.post('/users', payload)
    .then((session) => new Session(session));
  }

  public update (payload: Object): Promise<Session> {
    return this._api.post(`/users/${this._session.user.username}`, payload)
    .then((session) => new Session(session));
  }

}
