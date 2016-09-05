import { DomSanitizationService } from '@angular/platform-browser';

import { Evolution } from './evolution';
import { Pokemon }   from './pokemon';

export class EvolutionFamily {

  public pokemon: Pokemon[][];
  public evolutions: Evolution[][];

  constructor (params, _sanitizer: DomSanitizationService) {
    this.pokemon = params.pokemon.map((stage) => stage.map((p) => new Pokemon(p, _sanitizer)));
    this.evolutions = params.evolutions.map((stage) => stage.map((e) => new Evolution(e)));
  }

}
