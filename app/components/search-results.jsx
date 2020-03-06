import { Component } from 'react';
import { connect }   from 'react-redux';

import { PokemonComponent }                from './pokemon';
import { setQuery, SearchFilters }         from '../actions/search';

export class SearchResults extends Component {

  onClick = () => {
    this.props.setQuery('');
  }

  render () {
    const { captures, query, filter } = this.props;

    let filteredCaptures = captures.filter((capture) => capture.pokemon.name.toLowerCase().indexOf(query.toLowerCase()) === 0);

    if (SearchFilters.SHOW_UNCAPTURED === filter) {
      filteredCaptures = filteredCaptures.filter((capture) => !capture.captured);
    }

    if (filteredCaptures.length === 0) {
      return (
        <div className="search-results search-results-empty">
          <p>No results. <a className="link" onClick={this.onClick}>Clear your search?</a></p>
        </div>
      );
    }

    return (
      <div className="search-results">
        {filteredCaptures.map((capture) => <PokemonComponent key={capture.pokemon.id} capture={capture} />)}
      </div>
    );
  }

}

function mapStateToProps ({ query, filter }) {
  return { query, filter };
}

function mapDispatchToProps (dispatch) {
  return {
    setQuery: (query) => dispatch(setQuery(query))
  };
}

export const SearchResultsComponent = connect(mapStateToProps, mapDispatchToProps)(SearchResults);
