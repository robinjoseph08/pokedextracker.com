export function ReloadComponent ({ reload }) {
  if (!reload) {
    return null;
  }

  return (
    <div className="reload"><i className="fa fa-exclamation-circle"></i> There's a new version of the app available &ndash; <a className="link">Refresh your browser</a> now!</div>
  );
}
