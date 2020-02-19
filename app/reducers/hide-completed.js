import { TOGGLE_FILTER_COMPLETED } from '../actions/search';

export function hideCompleted (state = false, action) {
  switch (action.type) {
    case TOGGLE_FILTER_COMPLETED:
      return !state;
    default:
      return state;
  }
}
