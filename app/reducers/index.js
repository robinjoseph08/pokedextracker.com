import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';

import { currentPokemon } from './current-pokemon';
import { currentUser }    from './current-user';
import { pokemon }        from './pokemon';
import { region }         from './region';
import { reload }         from './reload';
import { session }        from './session';
import { showInfo }       from './show-info';
import { showScroll }     from './show-scroll';
import { showShare }      from './show-share';
import { token }          from './token';
import { users }          from './users';

export const reducer = combineReducers({
  currentPokemon,
  currentUser,
  pokemon,
  region,
  reload,
  routing: routerReducer,
  session,
  showInfo,
  showScroll,
  showShare,
  token,
  users
});
