import { Config }       from '../../config';
import { get }          from '../utils/api';
import { listCaptures } from './capture';
import { setLoading }   from './utils';

export const SET_USER         = 'SET_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function retrieveUser (username) {
  return (dispatch) => {
    dispatch(setLoading('tracker', true));

    return get(`${Config.API_HOST}/users/${username}`)
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
