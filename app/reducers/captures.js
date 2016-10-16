import { MARK_CAPTURED, SET_CAPTURES } from '../actions/capture';

export function captures (state = {}, action) {
  switch (action.type) {
    case SET_CAPTURES:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          captures: action.captures
        }
      };
    case MARK_CAPTURED:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          captures: [
            ...state[action.username].captures.slice(0, action.pokemon - 1),
            {
              ...state[action.username].captures[action.pokemon - 1],
              captured: action.captured
            },
            ...state[action.username].captures.slice(action.pokemon)
          ]
        }
      };
    default:
      return state;
  }
}
