import { Component } from 'react';
import { connect }   from 'react-redux';

import { setFilter } from '../actions/search';

export class SearchFilter extends Component {
  render () {
    const { filter, filterLabel, setFilter } = this.props;

    return (
      <div className="dex-search-filters">
        <div className="wrapper">
          <div className="form-group">
            <input ref={(c) => this._filter = c} name="filter" id="filter" type="checkbox" onChange={(e) => e.target.checked ? setFilter(filter) : setFilter('')} />
            <label htmlFor="filter">{filterLabel}</label>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setFilter: (filter) => dispatch(setFilter(filter))
  };
}

export const SearchFilterComponent = connect(null, mapDispatchToProps)(SearchFilter);
