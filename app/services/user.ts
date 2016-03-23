import { Injectable } from 'angular2/core';

import { ApiService } from './api';
import { Session }    from '../classes/session';

@Injectable()
export class UserService {

  private _api: ApiService;

  constructor (_api: ApiService) {
    this._api = _api;
  }

  public create (payload: Object): Promise<Session> {
    return this._api.post('/users', payload)
    .then((session: Object) => new Session(session));
  }

}
