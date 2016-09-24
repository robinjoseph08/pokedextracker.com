import { SET_POKEMON } from '../actions/pokemon';

export function pokemon (state = {}, action) {
  switch (action.type) {
    case SET_POKEMON:
      return {
        ...state,
        [action.pokemon.national_id]: action.pokemon
      };
    default:
      return state;
  }
}
