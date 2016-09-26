/*
{
  users: {
    robinjoseph08: {
      id: 1,
      username: 'robinjoseph08',
      captures: [{}]
    }
  },
  pokemon: {
    1: {
      national_id: 1,
      name: 'Bulbasaur'
    }
  },
  region: 'national',
  infoOpen: true,
  shareOpen: false,
  token: 'token',
  loading: {
    info: false,
    login: false
  },
  error: null,
  currentPokemon: 1
}
*/

import { push } from 'react-router-redux';

import { Config }               from '../../config';
import { post }                 from '../utils/api';
import { setError, setLoading } from './utils';

export const SET_TOKEN = 'SET_TOKEN';

export function login ({ username, password }) {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading('login', true));

    return post(`${Config.API_HOST}/sessions`, { username, password })
    .then(({ token }) => {
      dispatch(setToken(token));
      dispatch(setLoading('login', false));
      dispatch(push(`/u/${username}`));
    })
    .catch((err) => {
      dispatch(setError(err.message));
      dispatch(setLoading('login', false));
    });
  };
}

export function setToken (token) {
  return { type: SET_TOKEN, token };
}
