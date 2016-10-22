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
  showInfo: true,
  showShare: false,
  showScroll: true,
  token: 'token',
  currentPokemon: 1,
  reload: false
}
*/

import { push } from 'react-router-redux';

import { Config } from '../../config';
import { API }    from '../utils/api';

export const SET_TOKEN = 'SET_TOKEN';

export function login ({ username, password }) {
  return (dispatch) => {
    return API.post(`${Config.API_HOST}/sessions`, { username, password })
    .then(({ token }) => {
      dispatch(setToken(token));
      dispatch(push(`/u/${username}`));
    });
  };
}

export function setToken (token) {
  return { type: SET_TOKEN, token };
}
