import { SET_LOADING } from '../actions/utils';

const INITIAL_STATE = { login: false, register: false, tracker: false };

export function loading (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.property]: action.loading
      };
    default:
      return state;
  }
}
