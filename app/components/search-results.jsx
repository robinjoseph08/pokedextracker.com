import { connect } from 'react-redux';

import { PokemonComponent } from './pokemon';

export function SearchResults ({ captures, query }) {
  const filteredCaptures = captures.filter((capture) => capture.pokemon.name.toLowerCase().indexOf(query.toLowerCase()) === 0);

  return (
    <div className="search-results">
      {filteredCaptures.map((capture) => <PokemonComponent key={capture.pokemon.id} capture={capture} />)}
    </div>
  );
}

function mapStateToProps ({ query }) {
  return { query };
}

export const SearchResultsComponent = connect(mapStateToProps)(SearchResults);
