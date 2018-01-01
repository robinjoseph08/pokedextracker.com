import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';

import { currentDex }     from './current-dex';
import { currentPokemon } from './current-pokemon';
import { currentUser }    from './current-user';
import { games }          from './games';
import { notification }   from './notification';
import { pokemon }        from './pokemon';
import { region }         from './region';
import { reload }         from './reload';
import { sessionUser }    from './session-user';
import { session }        from './session';
import { showInfo }       from './show-info';
import { showScroll }     from './show-scroll';
import { showShare }      from './show-share';
import { token }          from './token';
import { users }          from './users';

export const reducer = combineReducers({
  currentDex,
  currentPokemon,
  currentUser,
  games,
  notification,
  pokemon,
  region,
  reload,
  routing: routerReducer,
  sessionUser,
  session,
  showInfo,
  showScroll,
  showShare,
  token,
  users
});
