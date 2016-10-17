export function AlertComponent ({ message, type }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
}
