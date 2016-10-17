import { SET_TOKEN } from '../actions/session';

export function token (state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    default:
      return state;
  }
}
