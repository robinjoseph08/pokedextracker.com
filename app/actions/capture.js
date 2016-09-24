import { Config }     from '../../config';
import { get, post }  from '../utils/api';
import { setLoading } from './utils';

export const SET_CAPTURES = 'SET_CAPTURES';

export function createCaptures (payload) {
  return (dispatch) => {
    dispatch(setLoading('tracker', true));

    return post(`${Config.API_HOST}/captures`, payload)
    .then((captures) => {
      dispatch(setCaptures(captures));
      dispatch(setLoading('tracker', false));
    })
    .catch(() => dispatch(setLoading('tracker', false)));
  };
}

export function listCaptures ({ id, username }) {
  return (dispatch) => {
    dispatch(setLoading('tracker', true));

    return get(`${Config.API_HOST}/captures`, { user: id })
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
