import { SET_ERROR } from '../actions/utils';

export function error (state = null, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.error;
    default:
      return state;
  }
}
