import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';

import { currentPokemon } from './current-pokemon';
import { currentUser }    from './current-user';
import { error }          from './error';
import { infoOpen }       from './info-open';
import { loading }        from './loading';
import { pokemon }        from './pokemon';
import { region }         from './region';
import { session }        from './session';
import { shareOpen }      from './share-open';
import { token }          from './token';
import { users }          from './users';

export const reducer = combineReducers({
  currentPokemon,
  currentUser,
  error,
  infoOpen,
  loading,
  pokemon,
  region,
  routing: routerReducer,
  session,
  shareOpen,
  token,
  users
});
