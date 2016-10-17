import { SET_CURRENT_POKEMON } from '../actions/pokemon';

export function currentPokemon (state = null, action) {
  switch (action.type) {
    case SET_CURRENT_POKEMON:
      return action.pokemon;
    default:
      return state;
  }
}
