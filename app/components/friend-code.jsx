import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactGA } from '../utils/analytics';

export function FriendCode ({ session, user }) {
  const ownPage = session && session.id === user.id;

  let editAccountBtn = null;

  if (ownPage) {
    editAccountBtn = (
      <Link to="/account" onClick={() => ReactGA.event({ action: 'click edit friend code', category: 'User' })}><i className="fa fa-pencil" /></Link>
    );
  }

  return (
    <div>
      <h2>
        <b>3DS FC</b>: <span className={user.friend_code_3ds ? '' : 'fc-missing'}>{user.friend_code_3ds || 'XXXX-XXXX-XXXX'}</span> {editAccountBtn}
      </h2>
      <h2>
        <b>Switch FC</b>: <span className={user.friend_code_switch ? '' : 'fc-missing'}>{user.friend_code_switch || 'SW-XXXX-XXXX-XXXX'}</span> {editAccountBtn}
      </h2>
    </div>
  );
}

function mapStateToProps ({ currentUser, session, users }) {
  return { session, user: users[currentUser] };
}

export const FriendCodeComponent = connect(mapStateToProps)(FriendCode);
