import { SET_CURRENT_DEX } from '../actions/dex';

export function currentDex (state = null, action) {
  switch (action.type) {
    case SET_CURRENT_DEX:
      return action.slug;
    default:
      return state;
  }
}
