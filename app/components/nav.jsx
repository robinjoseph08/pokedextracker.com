import { Link }    from 'react-router';
import { connect } from 'react-redux';

import { setToken } from '../actions/session';

export function Nav ({ session, signOut }) {
  if (session) {
    return (
      <nav>
        <Link to={`/u/${session.username}`}>Pokédex Tracker</Link>
        <Link to="/account">Account</Link>
        <a onClick={signOut}>Sign Out</a>
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/">Pokédex Tracker</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    signOut: () => dispatch(setToken(null))
  };
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);
