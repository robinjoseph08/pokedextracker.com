import { connect } from 'react-redux';

import { MarkAllButtonComponent } from './mark-all-button';
import { PokemonComponent }       from './pokemon';
import { padding }                from '../utils/formatting';

export const BOX_SIZE = 30;

export function Box ({ captures, dex }) {
  const empties = Array.from({ length: BOX_SIZE - captures.length }).map((_, i) => i);
  const firstPokemon = captures[0].pokemon;
  const lastPokemon = captures[captures.length - 1].pokemon;
  let title = <h1>{padding(firstPokemon[`${dex.region}_id`], 3)} - {padding(lastPokemon[`${dex.region}_id`], 3)}</h1>;

  if (firstPokemon.box) {
    title = <h1>{firstPokemon.box}</h1>;
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

export const BoxComponent = connect(mapStateToProps)(Box);
