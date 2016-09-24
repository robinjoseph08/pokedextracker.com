import { connect } from 'react-redux';

import { setRegion } from '../actions/tracker';

const REGIONS = ['national', 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos'];

export function Region ({ region, setRegion }) {
  return (
    <div className="region-filter">
      {REGIONS.map((r) => <div key={r} className={region === r ? 'active' : ''} onClick={() => setRegion(r)}>{r}</div>)}
    </div>
  );
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
