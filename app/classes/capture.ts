import { DomSanitizationService } from '@angular/platform-browser';

import { Pokemon }        from './pokemon';
import { PokemonService } from '../services/pokemon';

export class Capture {

  public user_id: number;
  public pokemon: Pokemon;
  public captured: boolean;

  private _pokemon: PokemonService;

  constructor (params, _pokemon: PokemonService, _sanitizer: DomSanitizationService) {
    this.user_id = params.user_id;
    this.pokemon = new Pokemon(params.pokemon, _sanitizer);
    this.captured = params.captured;

    this._pokemon = _pokemon;
  }

  public loadPokemon (): Promise<Pokemon> {
    return this._pokemon.retrieve(this.pokemon.national_id)
    .then((pokemon) => this.pokemon = pokemon);
  }

}
