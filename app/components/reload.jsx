import { useSelector } from 'react-redux';

export function Reload () {
  const reload = useSelector(({ reload }) => reload);

  if (!reload) {
    return null;
  }

  const handleClick = () => window.location.reload();

  return (
    <div className="reload">
      <i className="fa fa-exclamation-circle" />
      There's a new version of the app available &ndash; <a className="link" onClick={handleClick}>Refresh your browser</a> now!
    </div>
  );
}
