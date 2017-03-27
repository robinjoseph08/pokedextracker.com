import { TOGGLE_SHOW_CAUGHT_POKEMON } from '../actions/filters';

export function filters (state = { hideCaughtPokemon: false }, { type }) {
  switch (type) {
    case TOGGLE_SHOW_CAUGHT_POKEMON:
      return {
        hideCaughtPokemon: !state.hideCaughtPokemon
      };
    default:
      return state;
  }
}
