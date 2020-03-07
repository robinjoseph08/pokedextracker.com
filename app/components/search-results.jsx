import PropTypes                    from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo }                  from 'react';

import { PokemonComponent } from './pokemon';
import { setQuery }         from '../actions/search';

export function SearchResultsComponent ({ captures }) {
  const dispatch = useDispatch();

  const query = useSelector(({ query }) => query.toLowerCase());

  const handleClearClick = () => dispatch(setQuery(''));

  const filteredCaptures = useMemo(() => {
    return captures.filter((capture) => capture.pokemon.name.toLowerCase().indexOf(query) === 0);
  }, [captures, query]);

  if (filteredCaptures.length === 0) {
    return (
      <div className="search-results search-results-empty">
        <p>No results. <a className="link" onClick={handleClearClick}>Clear your search?</a></p>
      </div>
    );
  }

  return (
    <div className="search-results">
      {filteredCaptures.map((capture) => <PokemonComponent capture={capture} key={capture.pokemon.id} />)}
    </div>
  );
}

SearchResultsComponent.propTypes = {
  captures: PropTypes.arrayOf(PropTypes.object).isRequired
};
