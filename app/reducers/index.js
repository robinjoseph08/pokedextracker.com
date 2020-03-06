import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';

import { currentDex }     from './current-dex';
import { currentPokemon } from './current-pokemon';
import { currentUser }    from './current-user';
import { filter }         from './filter';
import { games }          from './games';
import { gamesById }      from './games-by-id';
import { notification }   from './notification';
import { pokemon }        from './pokemon';
import { query }          from './query';
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
  filter,
  games,
  gamesById,
  notification,
  pokemon,
  query,
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
