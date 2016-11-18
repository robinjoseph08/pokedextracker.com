import { SET_SESSION_USER } from '../actions/session';

export function sessionUser (state = null, action) {
  switch (action.type) {
    case SET_SESSION_USER:
      return action.user;
    default:
      return state;
  }
}
