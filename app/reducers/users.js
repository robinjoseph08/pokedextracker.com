import { SET_CAPTURES } from '../actions/capture';
import { SET_USER }     from '../actions/user';
import { captures }     from '../reducers/captures';

export function users (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        [action.user.username]: {
          ...action.user,
          captures: []
        }
      };
    case SET_CAPTURES:
      return captures(state, action);
    default:
      return state;
  }
}
