import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { setToken } from '../actions/session';

export class Nav extends Component {

  signOut = () => {
    const { clearToken } = this.props;

    clearToken();
  }

  render () {
    const { session } = this.props;

    if (session) {
      return (
        <nav>
          <Link to={`/u/${session.username}`}>Pokédex Tracker</Link>
          <Link to="/account">Account</Link>
          <a onClick={this.signOut}>Sign Out</a>
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

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    clearToken: () => dispatch(setToken(null))
  };
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);
