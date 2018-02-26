import { Component } from 'react';
import { connect }   from 'react-redux';

import { setQuery } from '../actions/search';

export class SearchBar extends Component {

  onClick = () => {
    this.props.setQuery('');
    this._search.value = '';
    this._search.focus();
  }

  render () {
    const { query, setQuery } = this.props;

    return (
      <div className="dex-search-bar">
        <div className="wrapper">
          <div className="form-group">
            <i className="fa fa-search" />
            <input className="form-control" ref={(c) => this._search = c} name="search" id="search" type="text" placeholder="Search by Pokémon name..." autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onChange={(e) => setQuery(e.target.value)} />
            {query.length > 0 ? <a onClick={this.onClick}><i className="fa fa-times" /></a> : null}
          </div>
        </div>
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

export const SearchBarComponent = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
