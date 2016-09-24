import { connect } from 'react-redux';

import { PokemonComponent } from './pokemon';
import { padding }          from '../utils/formatting';
// import { regionCheck }      from '../utils/pokemon';

export const BOX_SIZE = 30;

export function Box ({ captures }) {
  // const uncaught = captures.reduce((total, capture) => total + (capture.captured ? 0 : 1), 0);
  const empties = Array.from({ length: BOX_SIZE - captures.length });

  return (
    <div className="box">
      <div className="box-header">
        <h1>{padding(captures[0].pokemon.national_id, 3)} - {padding(captures[captures.length - 1].pokemon.national_id, 3)}</h1>
      </div>
      <div className="box-container">
        {captures.map((capture, i) => <PokemonComponent key={i} capture={capture}></PokemonComponent>)}
        {empties.map((capture, i) => <PokemonComponent key={i} capture={capture}></PokemonComponent>)}
      </div>
    </div>
  );
}

function mapStateToProps ({ region }) {
  return { region };
}

export const BoxComponent = connect(mapStateToProps)(Box);
