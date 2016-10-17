import { Component } from 'react';
import { connect }   from 'react-redux';

import { setRegion } from '../actions/tracker';

const REGIONS = ['national', 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos'];

export class Region extends Component {

  constructor (props) {
    super(props);
    this.state = { dropdown: false };
  }

  componentDidMount () {
    window.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.closeDropdown);
  }

  closeDropdown = () => {
    this.setState({ dropdown: false });
  }

  setRegion = (region) => {
    const { setRegion } = this.props;

    setRegion(region);
    this.setState({ dropdown: false });
  }

  render () {
    const { mobile, region, setRegion } = this.props;

    if (mobile) {
      let dropdown = null;

      if (this.state.dropdown) {
        dropdown = (
          <div className="dropdown">
            {REGIONS.map((r) => <div key={r} style={{ display: region === r ? 'none' : 'block' }} onClick={() => this.setRegion(r)}>{r}</div>)}
          </div>
        );
      }

      return (
        <div className="region-filter-mobile" onClick={(e) => e.stopPropagation()}>
          <div className="active" onClick={() => this.setState({ dropdown: !this.state.dropdown })}>
            <span>{region}</span>
            <i className="fa fa-sort-desc"></i>
          </div>
          {dropdown}
        </div>
      );
    }

    return (
      <div className="region-filter">
        {REGIONS.map((r) => <div key={r} className={region === r ? 'active' : ''} onClick={() => setRegion(r)}>{r}</div>)}
      </div>
    );
  }

}

function mapStateToProps ({ region }) {
  return { region };
}

function mapDispatchToProps (dispatch) {
  return {
    setRegion: (region) => dispatch(setRegion(region))
  };
}

export const RegionComponent = connect(mapStateToProps, mapDispatchToProps)(Region);
