export const SET_QUERY = 'SET_QUERY';
export const SET_FILTER = 'SET_FILTER';

export const SearchFilters = {
  SHOW_UNCAPTURED: 'SHOW_UNCAPTURED'
};

export const SearchFilterLabels = {
  SHOW_UNCAPTURED: 'Show uncaptured only'
};

export function setQuery (query) {
  return { type: SET_QUERY, query };
}

export function setFilter (filter) {
  return { type: SET_FILTER, filter };
}
