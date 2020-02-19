export const SET_QUERY = 'SET_QUERY';
export const TOGGLE_FILTER_COMPLETED = 'TOGGLE_FILTER_COMPLETED';

export function setQuery (query) {
  return { type: SET_QUERY, query };
}

export function toggleFilterCompleted () {
  return { type: TOGGLE_FILTER_COMPLETED };
}
