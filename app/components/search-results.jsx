import { Component } from 'react';
import { connect }   from 'react-redux';

import { PokemonComponent } from './pokemon';
import { setQuery }         from '../actions/search';

export class SearchResults extends Component {

  onClick = () => {
    this.props.setQuery('');
  }

  render () {
    const { captures, query } = this.props;

    const filteredCaptures = captures.filter((capture) => capture.pokemon.name.toLowerCase().indexOf(query.toLowerCase()) === 0);

    if (filteredCaptures.length === 0) {
      return (
        <div className="search-results">
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

function mapStateToProps ({ query }) {
  return { query };
}

function mapDispatchToProps (dispatch) {
  return {
    setQuery: (query) => dispatch(setQuery(query))
  };
}

export const SearchResultsComponent = connect(mapStateToProps, mapDispatchToProps)(SearchResults);
