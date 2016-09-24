export const SET_ERROR   = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export function setError (error) {
  return { type: SET_ERROR, error };
}

export function setLoading (property, loading) {
  return { type: SET_LOADING, loading, property };
}
