import { Link }    from 'react-router';
import { connect } from 'react-redux';

import { ReactGA } from '../utils/analytics';

export function FriendCode ({ session, user }) {
  const ownPage = session && session.id === user.id;

  return (
    <h2>
      <b>3DS FC</b>: <span className={user.friend_code_3ds ? '' : 'fc-missing'}>{user.friend_code_3ds || '0000-0000-0000'}</span>, <b>Switch FC</b>: <span className={user.friend_code_switch ? '' : 'fc-missing'}>{user.friend_code_switch || 'SW-0000-0000-0000'}</span>
      {ownPage ? <Link to="/account" onClick={() => ReactGA.event({ action: 'click edit friend code', category: 'User' })}><i className="fa fa-pencil" /></Link> : null}
    </h2>
  );
}

function mapStateToProps ({ currentUser, session, users }) {
  return { session, user: users[currentUser] };
}

export const FriendCodeComponent = connect(mapStateToProps)(FriendCode);
