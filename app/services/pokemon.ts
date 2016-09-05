import { DomSanitizationService } from '@angular/platform-browser';
import { Injectable }             from '@angular/core';

import { ApiService } from './api';
import { Pokemon }    from '../classes/pokemon';

@Injectable()
export class PokemonService {

  private _api: ApiService;
  private _cache: Pokemon[] = [];
  private _sanitizer: DomSanitizationService;

  constructor (_api: ApiService, _sanitizer: DomSanitizationService) {
    this._api = _api;
    this._sanitizer = _sanitizer;
  }

  public list (): Promise<Pokemon[]> {
    return this._api.get('/pokemon')
    .then((pokemon: Array<Object>) => pokemon.map((p) => new Pokemon(p, this._sanitizer)));
  }

  public retrieve (id: number): Promise<Pokemon> {
    if (this._cache[id]) {
      return Promise.resolve(this._cache[id]);
    } else {
      return this._api.get(`/pokemon/${id}`)
      .then((pokemon) => {
        this._cache[id] = new Pokemon(pokemon, this._sanitizer);
        return this._cache[id];
      });
    }
  }

}
