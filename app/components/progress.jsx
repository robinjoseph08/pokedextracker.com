import { connect } from 'react-redux';

import { decimal }     from '../utils/formatting';
import { regionCheck } from '../utils/pokemon';

export function Progress ({ captures, region }) {
  const caught = captures.filter(({ captured, pokemon }) => regionCheck(pokemon, region) && captured).length;
  const total = captures.filter(({ pokemon }) => regionCheck(pokemon, region)).length;
  const percent = 100 * caught / total;

  return (
    <div className="progress-container">
      <div className="progress-outer">
        <div className="progress-numbers"><b>{decimal(percent, 1)}%</b> done!<span className="mobile"> (<b>{caught}</b> caught, <b>{total - caught}</b> to go)</span></div>
        <div className="progress-inner" style={{ width: `${percent}%` }} />
      </div>
      <h3>(<b>{caught}</b> caught, <b>{total - caught}</b> to go)</h3>
    </div>
  );
}

function mapStateToProps ({ currentUser, region, users }) {
  return { captures: users[currentUser].captures, region };
}

export const ProgressComponent = connect(mapStateToProps)(Progress);
