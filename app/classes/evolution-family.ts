import { Evolution } from './evolution';
import { Pokemon }   from './pokemon';

export class EvolutionFamily {

  public pokemon: Pokemon[][];
  public evolutions: Evolution[][];

  constructor (params) {
    this.pokemon = params.pokemon.map((stage) => stage.map((p) => new Pokemon(p)));
    this.evolutions = params.evolutions.map((stage) => stage.map((e) => new Evolution(e)));
  }

}
