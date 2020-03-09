import PropTypes from 'prop-types';

export function DexIndicator ({ dex }) {
  return (
    <div className="dex-indicator">
      {dex.shiny && <i className="fa fa-star" title="shiny" />}
      <span className="label">{dex.regional ? 'Regional' : 'National'}</span>
      <span className="label">{dex.game.name}</span>
    </div>
  );
}

DexIndicator.propTypes = {
  dex: PropTypes.object.isRequired
};
