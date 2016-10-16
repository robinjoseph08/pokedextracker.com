import { push } from 'react-router-redux';

import { Config }                             from '../../config';
import { API }                                from '../utils/api';
import { checkVersion, setError, setLoading } from './utils';
import { listCaptures }                       from './capture';
import { setToken }                           from './session';

export const SET_USER         = 'SET_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function createUser ({ username, password, password_confirm, friend_code }) {
  return (dispatch) => {
    dispatch(setError(null));

    if (password !== password_confirm) {
      return dispatch(setError('passwords need to match'));
    }

    dispatch(setLoading('register', true));

    return API.post(`${Config.API_HOST}/users`, { username, password, friend_code, referrer: document.referrer })
    .then(({ token }) => {
      dispatch(setToken(token));
      dispatch(setLoading('register', false));
      dispatch(push(`/u/${username}`));
    })
    .catch((err) => {
      dispatch(setError(err.message));
      dispatch(setLoading('register', false));
    });
  };
}

export function retrieveUser (username) {
  return (dispatch) => {
    dispatch(checkVersion());
    dispatch(setLoading('tracker', true));

    return API.get(`${Config.API_HOST}/users/${username}`)
    .then((user) => {
      dispatch(setUser(user));
      dispatch(listCaptures(user));
    })
    .catch(() => dispatch(setLoading('tracker', false)));
  };
}

export function setCurrentUser (user) {
  return { type: SET_CURRENT_USER, user };
}

export function setUser (user) {
  return { type: SET_USER, user };
}
