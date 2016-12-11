import { SET_NOTIFICATION } from '../actions/utils';

export function notification (state = false, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.notification;
    default:
      return state;
  }
}
