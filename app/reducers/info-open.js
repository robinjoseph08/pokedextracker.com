import { SET_INFO_OPEN } from '../actions/tracker';

const MOBILE_WIDTH  = 1100;
const INITIAL_STATE = window.innerWidth > MOBILE_WIDTH;

export function infoOpen (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_INFO_OPEN:
      return action.open;
    default:
      return state;
  }
}
