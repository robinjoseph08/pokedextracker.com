import { SET_GAMES } from '../actions/game';

export function gamesById (state = {}, action) {
  switch (action.type) {
    case SET_GAMES:
      const gamesById = action.games.reduce((games, game) => {
        return Object.assign({ [game.id]: game }, games);
      }, {});

      return gamesById;
    default:
      return state;
  }
}
