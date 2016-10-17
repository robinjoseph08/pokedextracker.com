import fetch from 'isomorphic-fetch';

export const SET_ERROR   = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_RELOAD  = 'SET_RELOAD';

let VERSION;

export function checkVersion () {
  return (dispatch) => {
    return fetch('/version')
    .then((response) => response.text())
    .then((version) => {
      if (!VERSION) {
        VERSION = version;
      } else if (VERSION !== version) {
        dispatch(setReload(true));
      }
    })
    .catch(() => {});
  };
}

export function setError (error) {
  return { type: SET_ERROR, error };
}

export function setLoading (property, loading) {
  return { type: SET_LOADING, loading, property };
}

export function setReload (reload) {
  return { type: SET_RELOAD, reload };
}
