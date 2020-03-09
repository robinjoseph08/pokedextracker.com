import { SET_SHOW_INFO } from '../actions/tracker';

const MOBILE_WIDTH = 1100;
const INITIAL_STATE = window.innerWidth > MOBILE_WIDTH;

export function showInfo (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SHOW_INFO:
      return action.show;
    default:
      return state;
  }
}
