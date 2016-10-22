import { MarkAllButtonComponent } from './mark-all-button';
import { PokemonComponent }       from './pokemon';
import { padding }                from '../utils/formatting';

export const BOX_SIZE = 30;

export function BoxComponent ({ captures }) {
  const empties = Array.from({ length: BOX_SIZE - captures.length });

  return (
    <div className="box">
      <div className="box-header">
        <h1>{padding(captures[0].pokemon.national_id, 3)} - {padding(captures[captures.length - 1].pokemon.national_id, 3)}</h1>
        <MarkAllButtonComponent captures={captures} />
      </div>
      <div className="box-container">
        {captures.map((capture, i) => <PokemonComponent key={i} capture={capture} />)}
        {empties.map((capture, i) => <PokemonComponent key={i} capture={capture} />)}
      </div>
    </div>
  );
}
