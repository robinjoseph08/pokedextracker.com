import { Injectable } from 'angular2/core';

import { ApiService }     from './api';
import { Capture }        from '../classes/capture';
import { PokemonService } from './pokemon';

@Injectable()
export class CaptureService {

  private _api: ApiService;
  private _pokemon: PokemonService;

  constructor (_api: ApiService, _pokemon: PokemonService) {
    this._api = _api;
    this._pokemon = _pokemon;
  }

  public list (params): Promise<Capture[]> {
    return this._api.get('/captures', params)
    .then((captures: Array<Object>) => captures.map((c) => new Capture(c, this._pokemon)));
  }

  public create (payload): Promise<Capture[]> {
    return this._api.post('/captures', payload)
    .then((captures: Array<Object>) => captures.map((c) => new Capture(c, this._pokemon)));
  }

  public delete (payload): Promise<Object> {
    return this._api.delete('/captures', payload);
  }

}
