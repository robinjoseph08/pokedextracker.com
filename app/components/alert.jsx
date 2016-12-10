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
