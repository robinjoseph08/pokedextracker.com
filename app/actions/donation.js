import { Config } from '../../config';
import { API }    from '../utils/api';

export const SET_SESSION_USER = 'SET_SESSION_USER';
export const SET_TOKEN        = 'SET_TOKEN';

export function donate (payload) {
  return () => {
    return API.post(`${Config.API_HOST}/donations`, payload);
  };
}
