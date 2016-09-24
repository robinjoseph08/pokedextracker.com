import { SET_CURRENT_USER } from '../actions/user';

export function currentUser (state = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    default:
      return state;
  }
}
