import { connect } from 'react-redux';

import { setNotification } from '../actions/utils';

export function Notification ({ notification, setNotification }) {
  if (notification) {
    return null;
  }

  return (
    <div className="alert alert-muted">
      <i className="fa fa-times" onClick={() => setNotification(true)} />
      <p>We've added support for Ultra Sun &amp; Ultra Moon dexes! Read more about the update <a href="http://bit.ly/pt-usum" target="_blank" rel="noopener noreferrer">on our blog</a>.</p>
    </div>
  );
}

function mapStateToProps ({ notification }) {
  return { notification };
}

function mapDispatchToProps (dispatch) {
  return {
    setNotification: (value) => dispatch(setNotification(value))
  };
}

export const NotificationComponent = connect(mapStateToProps, mapDispatchToProps)(Notification);
