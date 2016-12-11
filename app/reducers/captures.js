import { MARK_CAPTURED, SET_CAPTURES } from '../actions/capture';

export function captures (state = {}, action) {
  switch (action.type) {
    case SET_CAPTURES:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          dexesBySlug: {
            [action.slug]: {
              ...state[action.username].dexesBySlug[action.slug],
              captures: action.captures
            }
          }
        }
      };
    case MARK_CAPTURED:
      const newState = {
        ...state,
        [action.username]: {
          ...state[action.username],
          dexesBySlug: {
            [action.slug]: {
              ...state[action.username].dexesBySlug[action.slug],
              captures: state[action.username].dexesBySlug[action.slug].captures.slice()
            }
          }
        }
      };
      const index = newState[action.username].dexesBySlug[action.slug].captures.findIndex((c) => c.pokemon.national_id === action.pokemon[0]);
      for (let i = index, count = 0; count < action.pokemon.length; i++) {
        if (action.pokemon.indexOf(newState[action.username].dexesBySlug[action.slug].captures[i].pokemon.national_id) !== -1) {
          newState[action.username].dexesBySlug[action.slug].captures[i].captured = action.captured;
          count++;
        }
      }
      return newState;
    default:
      return state;
  }
}
