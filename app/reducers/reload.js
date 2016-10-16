import { SET_RELOAD } from '../actions/utils';

export function reload (state = false, action) {
  switch (action.type) {
    case SET_RELOAD:
      return action.reload;
    default:
      return state;
  }
}
