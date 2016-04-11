import { Evolution } from './evolution';

export class EvolutionFamily {

  public pokemon;
  public evolutions: Evolution[][];

  constructor (params) {
    this.pokemon = params.pokemon;
    this.evolutions = params.evolutions;
  }

}
