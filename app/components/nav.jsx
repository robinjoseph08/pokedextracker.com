import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ReactGA }                  from '../utils/analytics';
import { retrieveUser }             from '../actions/user';
import { setSessionUser, setToken } from '../actions/session';

export class Nav extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount () {
    this.reset();
  }

  reset (props) {
    const { retrieveUser, session, setSessionUser } = props || this.props;

    if (session) {
      this.setState({ ...this.state, loading: true });

      retrieveUser(session.username)
      .then((user) => {
        setSessionUser(user);
        this.setState({ ...this.state, loading: false });
      })
      .catch(() => this.setState({ ...this.state, loading: false }));
    }
  }

  signOut = () => {
    const { clearToken } = this.props;

    ReactGA.event({ action: 'sign out', category: 'Session' });

    clearToken();
  }

  render () {
    const { session, user } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <nav>
          <Link to="/">Pokédex Tracker</Link>
        </nav>
      );
    }

    if (session && user) {
      return (
        <nav>
          <Link to="/">Pokédex Tracker</Link>
          <a href="https://www.patreon.com/pokedextracker" target="_blank" rel="noopener noreferrer">Patreon</a>
          <div className="dropdown">
            <a href="#">{session.username} <i className="fa fa-caret-down" /></a>
            <ul>
              <div className="dropdown-scroll">
                {user.dexes.map((dex) => <li key={dex.id}><Link to={`/u/${session.username}/${dex.slug}`}><i className="fa fa-th" /> {dex.title}</Link></li>)}
              </div>
              <li><Link to={`/u/${session.username}`}><i className="fa fa-user" /> Profile</Link></li>
              <li><Link to="/account"><i className="fa fa-cog" /> Account Settings</Link></li>
              <li><a onClick={this.signOut}><i className="fa fa-sign-out" /> Sign Out</a></li>
            </ul>
          </div>
        </nav>
      );
    }

    return (
      <nav>
        <Link to="/">Pokédex Tracker</Link>
        <a href="https://www.patreon.com/pokedextracker" target="_blank" rel="noopener noreferrer">Patreon</a>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }
}

function mapStateToProps ({ session, sessionUser }) {
  return { session, user: sessionUser };
}

function mapDispatchToProps (dispatch) {
  return {
    clearToken: () => dispatch(setToken(null)),
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setSessionUser: (user) => dispatch(setSessionUser(user))
  };
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);
