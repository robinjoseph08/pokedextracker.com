import { Pokemon } from './pokemon';

export class Capture {

  public user_id: number;
  public pokemon: Pokemon;
  public captured: boolean;

  constructor (params) {
    this.user_id = params.user_id;
    this.pokemon = new Pokemon(params.pokemon);
    this.captured = params.captured;
  }

}
