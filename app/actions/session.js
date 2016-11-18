import { push } from 'react-router-redux';

import { Config } from '../../config';
import { API }    from '../utils/api';

export const SET_SESSION_USER = 'SET_SESSION_USER';
export const SET_TOKEN        = 'SET_TOKEN';

export function login ({ username, password }) {
  return (dispatch) => {
    return API.post(`${Config.API_HOST}/sessions`, { username, password })
    .then(({ token }) => {
      dispatch(setToken(token));
      dispatch(push(`/u/${username}`));
    });
  };
}

export function setSessionUser (user) {
  return { type: SET_SESSION_USER, user };
}

export function setToken (token) {
  return { type: SET_TOKEN, token };
}
