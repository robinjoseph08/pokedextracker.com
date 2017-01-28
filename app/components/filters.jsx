import { connect }   from 'react-redux';

import { toggleShowCaughtPokemon } from '../actions/filters';

const Filters = ({ hideCaughtPokemon, toggleShowCaughtPokemon }) => (
  <div>
    <h3>Filters</h3>
    <label>
      Hide caught Pokémon <input type="checkbox" checked={hideCaughtPokemon} onChange={toggleShowCaughtPokemon} />
    </label>
  </div>
);

function mapStateToProps ({ filters }) {
  return {
    hideCaughtPokemon: filters.hideCaughtPokemon
  };
}

const mapDispatchToProps = { toggleShowCaughtPokemon };

export const FiltersComponent = connect(mapStateToProps, mapDispatchToProps)(Filters);
