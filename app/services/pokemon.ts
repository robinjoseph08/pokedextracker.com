import { Injectable } from 'angular2/core';
import { Http }       from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { Pokemon } from '../classes/pokemon';

@Injectable()
export class PokemonService {

  private _http: Http;

  constructor (_http: Http) {
    this._http = _http;
  }

  public list (): Observable<Pokemon[]> {
    return this._http.get('https://api.pokedextracker.com/pokemon')
    .map((res) => res.json().map((p) => new Pokemon(p)));
  }

}
