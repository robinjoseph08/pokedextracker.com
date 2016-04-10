import { Injectable } from 'angular2/core';

import { ApiService } from './api';
import { Pokemon }    from '../classes/pokemon';

@Injectable()
export class PokemonService {

  private _api: ApiService;

  constructor (_api: ApiService) {
    this._api = _api;
  }

  public list (): Promise<Pokemon[]> {
    return this._api.get('/pokemon')
    .then((pokemon: Array<Object>) => pokemon.map((p) => new Pokemon(p)));
  }

  public retrieve (id: number): Promise<Pokemon> {
    return this._api.get(`/pokemon/${id}`)
    .then((pokemon) => new Pokemon(pokemon));
  }

}
