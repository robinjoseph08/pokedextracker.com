import { Config }                   from '../../config';
import { API }                      from '../utils/api';
import { checkVersion, setLoading } from './utils';

export const MARK_CAPTURED = 'MARK_CAPTURED';
export const SET_CAPTURES  = 'SET_CAPTURES';

export function createCaptures ({ payload, username }) {
  return (dispatch) => {
    dispatch(checkVersion());

    return API.post(`${Config.API_HOST}/captures`, payload)
    .then(() => payload.pokemon.map((pokemon) => dispatch(markCaptured(true, pokemon, username))));
  };
}

export function deleteCaptures ({ payload, username }) {
  return (dispatch) => {
    dispatch(checkVersion());

    return API.delete(`${Config.API_HOST}/captures`, payload)
    .then(() => payload.pokemon.map((pokemon) => dispatch(markCaptured(false, pokemon, username))));
  };
}

export function listCaptures ({ id, username }) {
  return (dispatch) => {
    dispatch(checkVersion());
    dispatch(setLoading('tracker', true));

    return API.get(`${Config.API_HOST}/captures`, { user: id })
    .then((captures) => {
      dispatch(setCaptures(captures, username));
      dispatch(setLoading('tracker', false));
    })
    .catch(() => dispatch(setLoading('tracker', false)));
  };
}

export function setCaptures (captures, username) {
  return { type: SET_CAPTURES, captures, username };
}

export function markCaptured (captured, pokemon, username) {
  return { type: MARK_CAPTURED, captured, pokemon, username };
}
