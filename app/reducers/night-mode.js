import { SET_NIGHT_MODE } from '../actions/utils';

export function nightMode (state = null, action) {
  switch (action.type) {
    case SET_NIGHT_MODE:
      return action.nightMode;
    default:
      return state;
  }
}
