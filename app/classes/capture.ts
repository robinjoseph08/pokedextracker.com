import { Pokemon }        from './pokemon';
import { PokemonService } from '../services/pokemon';

export class Capture {

  public user_id: number;
  public pokemon: Pokemon;
  public captured: boolean;

  private _pokemon: PokemonService;

  constructor (params, _pokemon: PokemonService) {
    this.user_id = params.user_id;
    this.pokemon = new Pokemon(params.pokemon);
    this.captured = params.captured;

    this._pokemon = _pokemon;
  }

  public loadPokemon () {
    this._pokemon.retrieve(this.pokemon.national_id)
    .then((pokemon) => this.pokemon = pokemon);
  }

}
