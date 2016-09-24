import { SET_TOKEN }   from '../actions/session';
import { tokenToUser } from '../utils/local-storage';

export function session (state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return tokenToUser(action.token);
    default:
      return state;
  }
}
