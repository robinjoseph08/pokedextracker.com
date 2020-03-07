import { useMemo }     from 'react';
import { useSelector } from 'react-redux';

import { MarkAllButtonComponent } from './mark-all-button';
import { PokemonComponent }       from './pokemon';
import { padding }                from '../utils/formatting';
import { useDeferredRender }      from '../hooks/use-deferred-render';

export const BOX_SIZE = 30;

export function BoxComponent ({ captures, deferred }) {
  const render = useDeferredRender(!deferred);

  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser].dexesBySlug[currentDex]);

  const empties = useMemo(() => Array.from({ length: BOX_SIZE - captures.length }).map((_, i) => i), [captures]);

  const firstPokemon = captures[0].pokemon;
  const lastPokemon = captures[captures.length - 1].pokemon;
  let title = firstPokemon.box;

  if (!firstPokemon.box) {
    const firstNumber = dex.regional ? firstPokemon[`${dex.game.game_family.id}_id`] : firstPokemon.national_id;
    const lastNumber = dex.regional ? lastPokemon[`${dex.game.game_family.id}_id`] : lastPokemon.national_id;
    title = `${padding(firstNumber, 3)} - ${padding(lastNumber, 3)}`;
  }

  if (!render) {
    return null;
  }

  return (
    <div className="box">
      <div className="box-header">
        <h1>{title}</h1>
        <MarkAllButtonComponent captures={captures} />
      </div>
      <div className="box-container">
        {captures.map((capture) => <PokemonComponent key={capture.pokemon.id} capture={capture} />)}
        {empties.map((index) => <PokemonComponent key={index} capture={null} />)}
      </div>
    </div>
  );
}
