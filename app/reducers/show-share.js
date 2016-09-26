import { SET_SHOW_SHARE } from '../actions/tracker';

export function showShare (state = false, action) {
  switch (action.type) {
    case SET_SHOW_SHARE:
      return action.show;
    default:
      return state;
  }
}
