import { Injectable } from 'angular2/core';

import { ApiService } from './api';
import { Capture }    from '../classes/capture';

@Injectable()
export class CaptureService {

  private _api: ApiService;

  constructor (_api: ApiService) {
    this._api = _api;
  }

  public list (params): Promise<Capture[]> {
    return this._api.get('/captures', params)
    .then((captures: Array<Object>) => captures.map((c) => new Capture(c)));
  }

  public create (payload): Promise<Capture> {
    return this._api.post('/captures', payload)
    .then((capture) => new Capture(capture));
  }

  public delete (payload): Promise<Object> {
    return this._api.delete('/captures', payload);
  }

}
