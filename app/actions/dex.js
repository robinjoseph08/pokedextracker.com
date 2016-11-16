import { Config }       from '../../config';
import { API }          from '../utils/api';
import { checkVersion } from './utils';

export const SET_DEX         = 'SET_DEX';
export const SET_CURRENT_DEX = 'SET_CURRENT_DEX';

export function createDex ({ payload, username }) {
  return (dispatch) => {
    dispatch(checkVersion());

    return API.post(`${Config.API_HOST}/users/${username}/dexes`, payload);
  };
}

export function retrieveDex (slug, username) {
  return (dispatch) => {
    dispatch(checkVersion());

    return API.get(`${Config.API_HOST}/users/${username}/dexes/${slug}`)
    .then((dex) => {
      dispatch(setDex(dex, username));
      return dex;
    });
  };
}

export function setCurrentDex (slug, username) {
  return { type: SET_CURRENT_DEX, slug, username };
}

export function setDex (dex, username) {
  return { type: SET_DEX, dex, username };
}
