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
      action.pokemon.forEach((pokemon) => newState[action.username].dexesBySlug[action.slug].captures[pokemon - 1].captured = action.captured);
      return newState;
    default:
      return state;
  }
}
