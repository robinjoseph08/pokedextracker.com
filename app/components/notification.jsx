import { connect } from 'react-redux';

import { setNotification } from '../actions/utils';

export function Notification ({ notification, message, setNotification }) {
  if (notification) {
    return null;
  }

  return (
    <div>
      <i className="fa fa-times" onClick={() => setNotification(true)} />
      <p>{message}</p>
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
