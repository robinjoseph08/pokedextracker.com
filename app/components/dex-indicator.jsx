import PropTypes           from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar }          from '@fortawesome/free-solid-svg-icons';

export function DexIndicator ({ dex }) {
  return (
    <div className="dex-indicator">
      {dex.shiny && <FontAwesomeIcon icon={faStar} title="Shiny" />}
      <span className="label">{dex.regional ? 'Regional' : 'National'}</span>
      <span className="label">{dex.game.name}</span>
    </div>
  );
}

DexIndicator.propTypes = {
  dex: PropTypes.object.isRequired
};
