import { connect } from 'react-redux';

import { MarkAllButtonComponent } from './mark-all-button';
import { PokemonComponent }       from './pokemon';
import { deferComponentRender }   from '../utils/defer-component-render';
import { padding }                from '../utils/formatting';

export const STANDARD_BOX_SIZE = 30;

export function Box ({ captures, dex, hideCompleted }) {
  const showPokemon = showPokemonCurried(hideCompleted);
  const pokemonToShow = captures.filter((capture) => showPokemon(capture));
  let BOX_SIZE;
  // We want to have every box in a line filled, but no need to add extra lines if we don't need to
  if (pokemonToShow.length % 6 === 0) {
    BOX_SIZE = pokemonToShow.length;
  } else {
    BOX_SIZE = pokemonToShow.length + (6 - (pokemonToShow.length % 6))
  }
  if (BOX_SIZE === 0) {
    return null;
  }
  const empties = Array.from({ length: BOX_SIZE - pokemonToShow.length }).map((_, i) => i);
  const firstPokemon = captures[0].pokemon;
  const lastPokemon = captures[captures.length - 1].pokemon;
  let title = <h1>{firstPokemon.box}</h1>;

  if (!firstPokemon.box) {
    const firstNumber = dex.regional ? firstPokemon[`${dex.game.game_family.id}_id`] : firstPokemon.national_id;
    const lastNumber = dex.regional ? lastPokemon[`${dex.game.game_family.id}_id`] : lastPokemon.national_id;
    title = <h1>{padding(firstNumber, 3)} - {padding(lastNumber, 3)}</h1>;
  }

  return (
    <div className="box">
      <div className="box-header">
        {title}
        <MarkAllButtonComponent captures={captures} />
      </div>
      <div className="box-container">
        {pokemonToShow.map((capture) => <PokemonComponent key={capture.pokemon.id} capture={capture} />)}
        {empties.map((index) => <PokemonComponent key={index} capture={null} />)}
      </div>
    </div>
  );
}

const showPokemonCurried = (hideCompleted) => (capture) => {
  if (!hideCompleted) {
    return true;
  } else {
    return !capture.captured;
  }
}

function mapStateToProps ({ currentDex, currentUser, users, hideCompleted }) {
  return { dex: users[currentUser].dexesBySlug[currentDex], hideCompleted };
}

export const DeferredBoxComponent = deferComponentRender(connect(mapStateToProps)(Box));
export const BoxComponent = connect(mapStateToProps)(Box);
