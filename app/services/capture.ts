import { DomSanitizationService } from '@angular/platform-browser';
import { Injectable }             from '@angular/core';

import { ApiService }     from './api';
import { Capture }        from '../classes/capture';
import { PokemonService } from './pokemon';

@Injectable()
export class CaptureService {

  private _api: ApiService;
  private _pokemon: PokemonService;
  private _sanitizer: DomSanitizationService;

  constructor (_api: ApiService, _pokemon: PokemonService, _sanitizer: DomSanitizationService) {
    this._api = _api;
    this._pokemon = _pokemon;
    this._sanitizer = _sanitizer;
  }

  public list (params): Promise<Capture[]> {
    return this._api.get('/captures', params)
    .then((captures: Array<Object>) => captures.map((c) => new Capture(c, this._pokemon, this._sanitizer)));
  }

  public create (payload): Promise<Capture[]> {
    return this._api.post('/captures', payload)
    .then((captures: Array<Object>) => captures.map((c) => new Capture(c, this._pokemon, this._sanitizer)));
  }

  public delete (payload): Promise<Object> {
    return this._api.delete('/captures', payload);
  }

}
