import { connect } from 'react-redux';

export function Reload ({ reload }) {
  if (!reload) {
    // return null;
    <div className="reload">
      <i className="fa fa-exclamation-circle" />
      There's a new version of the app available &ndash; <a className="link" onClick={() => window.location.reload()}>Refresh your browser</a> now!
    </div>
  }

  return (
    <div className="reload">
      <i className="fa fa-exclamation-circle" />
      There's a new version of the app available &ndash; <a className="link" onClick={() => window.location.reload()}>Refresh your browser</a> now!
    </div>
  );
}

function mapStateToProps ({ reload }) {
  return { reload };
}

export const ReloadComponent = connect(mapStateToProps)(Reload);
