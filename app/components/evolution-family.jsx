import { connect } from 'react-redux';

import { EvolutionsComponent } from './evolutions';
import { iconClass }           from '../utils/pokemon';
import { setCurrentPokemon }   from '../actions/pokemon';

export function EvolutionFamily ({ family, setCurrentPokemon }) {
  let column1 = null;
  let column2 = null;

  if (family.pokemon.length > 1) {
    column1 = (
      <div className="evolution-pokemon-column">
        {family.pokemon[1].map((pokemon, i) => <a key={i} onClick={() => setCurrentPokemon(pokemon.national_id)}>
          <i className={iconClass(pokemon.national_id)}></i>
        </a>)}
      </div>
    );
  }

  if (family.pokemon.length > 2) {
    column2 = (
      <div className="evolution-pokemon-column">
        {family.pokemon[2].map((pokemon, i) => <a key={i} onClick={() => setCurrentPokemon(pokemon.national_id)}>
          <i className={iconClass(pokemon.national_id)}></i>
        </a>)}
      </div>
    );
  }

  return (
    <div className="info-evolutions">
      <div className="evolution-pokemon-column">
        <a onClick={() => setCurrentPokemon(family.pokemon[0][0].national_id)}>
          <i className={iconClass(family.pokemon[0][0].national_id)}></i>
        </a>
        {family.evolutions.length === 0 ? <div>Does not evolve</div> : null}
      </div>
      {family.evolutions.length > 0 ? <EvolutionsComponent evolutions={family.evolutions[0]}></EvolutionsComponent> : null}
      {column1}
      {family.evolutions.length > 1 ? <EvolutionsComponent evolutions={family.evolutions[1]}></EvolutionsComponent> : null}
      {column2}
    </div>
  );
}

function mapDispatchToProps (dispatch) {
  return {
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id))
  };
}

export const EvolutionFamilyComponent = connect(null, mapDispatchToProps)(EvolutionFamily);
