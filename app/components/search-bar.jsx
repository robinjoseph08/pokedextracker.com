import { Component } from 'react';
import { connect }   from 'react-redux';

import { ReactGA }  from '../utils/analytics';
import { setQuery, toggleFilterCompleted } from '../actions/search';

export class SearchBar extends Component {

  componentWillMount () {
    document.addEventListener('keyup', this.onKeyup);
    this.props.setQuery('');
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.onKeyup);
  }

  onKeyup = (event) => {
    if (event.target.tagName.toLowerCase() !== 'input' && event.key === '/') {
      ReactGA.event({ action: 'used shortcut', category: 'Search' });
      this._search && this._search.focus();
    }
  }

  onClick = () => {
    this.props.setQuery('');
    this._search.focus();
  }

  render () {
    const { query, setQuery, filterCompleted, toggleFilterCompleted } = this.props;

    if (this._search) {
      this._search.value = query;
    }

    return (
      <div className="dex-search-bar">
        <div className="wrapper">
          <div className="form-group">
            <i className="fa fa-search" />
            <input className="form-control" ref={(c) => this._search = c} name="search" id="search" type="text" placeholder="Search by Pokémon name (press / to quick search)" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onChange={(e) => setQuery(e.target.value)} />
            {query.length > 0 ? <a onClick={this.onClick}><i className="fa fa-times" /></a> : null}
          </div>
          <div className="form-group">
            <input className="form-control" name="filter-completed" id="filter-completed" type="checkbox" onChange={(e) => toggleFilterCompleted()} checked={filterCompleted} />
            Hide Completed
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps ({ query, filterCompleted }) {
  return { query };
}

function mapDispatchToProps (dispatch) {
  return {
    setQuery: (query) => dispatch(setQuery(query)),
    toggleFilterCompleted: (query) => dispatch(toggleFilterCompleted(query))
  };
}

export const SearchBarComponent = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
