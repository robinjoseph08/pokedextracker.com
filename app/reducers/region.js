import { SET_REGION } from '../actions/tracker';

export function region (state = 'national', action) {
  switch (action.type) {
    case SET_REGION:
      return action.region;
    default:
      return state;
  }
}
