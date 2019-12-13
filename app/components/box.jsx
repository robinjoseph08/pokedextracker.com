import { connect } from 'react-redux';

import { MarkAllButtonComponent } from './mark-all-button';
import { PokemonComponent }       from './pokemon';
import { deferComponentRender }   from '../utils/defer-component-render';
import { padding }                from '../utils/formatting';

export const BOX_SIZE = 30;

export function Box ({ captures, dex }) {
  const empties = Array.from({ length: BOX_SIZE - captures.length }).map((_, i) => i);
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
        {captures.map((capture) => <PokemonComponent key={capture.pokemon.id} capture={capture} />)}
        {empties.map((index) => <PokemonComponent key={index} capture={null} />)}
      </div>
    </div>
  );
}

function mapStateToProps ({ currentDex, currentUser, users }) {
  return { dex: users[currentUser].dexesBySlug[currentDex] };
}

export const DeferredBoxComponent = deferComponentRender(connect(mapStateToProps)(Box));
export const BoxComponent = connect(mapStateToProps)(Box);
