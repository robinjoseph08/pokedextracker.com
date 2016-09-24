import { SET_SHARE_OPEN } from '../actions/tracker';

export function shareOpen (state = false, action) {
  switch (action.type) {
    case SET_SHARE_OPEN:
      return action.open;
    default:
      return state;
  }
}
