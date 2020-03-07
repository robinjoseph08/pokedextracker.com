import PropTypes  from 'prop-types';
import classNames from 'classnames';

export function AlertComponent ({ className, message, type }) {
  if (!message) {
    return null;
  }

  return (
    <div className={classNames('alert', `alert-${type}`, className)}>
      {message}
    </div>
  );
}

AlertComponent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.any,
  type: PropTypes.oneOf(['error', 'success']).isRequired
};
