export function FormWarningComponent ({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="form-warning">
      <div className="tooltip">
        <i className="fa fa-exclamation-triangle" />
        <span className="tooltip-text">{message}</span>
      </div>
    </div>
  );
}
