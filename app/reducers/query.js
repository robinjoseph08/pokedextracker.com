import { SET_QUERY } from '../actions/search';

export function query (state = '', action) {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return state;
  }
}
