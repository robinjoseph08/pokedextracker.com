import { connect } from 'react-redux';

import { EvolutionsComponent } from './evolutions';
import { iconClass }           from '../utils/pokemon';
import { setCurrentPokemon }   from '../actions/pokemon';

export function EvolutionFamily ({ dex, family, setCurrentPokemon }) {
  let column1 = null;
  let column2 = null;

  if (family.pokemon.length > 1) {
    column1 = (
      <div className="evolution-pokemon-column">
        {family.pokemon[1].map((pokemon) => <a key={pokemon.id} onClick={() => setCurrentPokemon(pokemon.id)} title={pokemon.name}>
          <i className={iconClass(pokemon, dex)} />
        </a>)}
      </div>
    );
  }

  if (family.pokemon.length > 2) {
    column2 = (
      // styling hack for mr.rime
      <div className={`evolution-pokemon-column ${family.pokemon[2][0].national_id === 866 ? 'push' : ''}`}>
        {family.pokemon[2].map((pokemon) => <a key={pokemon.id} onClick={() => setCurrentPokemon(pokemon.id)} title={pokemon.name}>
          <i className={iconClass(pokemon, dex)} />
        </a>)}
      </div>
    );
  }

  return (
    <div className="info-evolutions">
      <div className="evolution-pokemon-column">
        <a onClick={() => setCurrentPokemon(family.pokemon[0][0].id)} title={family.pokemon[0][0].name}>
          <i className={iconClass(family.pokemon[0][0], dex)} />
        </a>
        {family.evolutions.length === 0 ? <div>Does not evolve</div> : null}
      </div>
      {family.evolutions.length > 0 ? <EvolutionsComponent evolutions={family.evolutions[0]} /> : null}
      {column1}
      {family.evolutions.length > 1 ? <EvolutionsComponent evolutions={family.evolutions[1]} pokemonId={family.pokemon[2][0].national_id} /> : null}
      {column2}
    </div>
  );
}

function mapStateToProps ({ currentDex, currentUser, users }) {
  return { dex: users[currentUser].dexesBySlug[currentDex] };
}

const mapDispatchToProps = { setCurrentPokemon };

export const EvolutionFamilyComponent = connect(mapStateToProps, mapDispatchToProps)(EvolutionFamily);
