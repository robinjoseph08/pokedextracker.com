import { SET_SHOW_SCROLL } from '../actions/tracker';

export function showScroll (state = false, action) {
  switch (action.type) {
    case SET_SHOW_SCROLL:
      return action.show;
    default:
      return state;
  }
}
