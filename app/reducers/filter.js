import { SET_FILTER } from '../actions/search';

export function filter (state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
