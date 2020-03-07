import { Link }                     from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactGA }  from '../utils/analytics';
import { setToken } from '../actions/session';

export function NavComponent () {
  const dispatch = useDispatch();

  const session = useSelector(({ session }) => session);
  const user = useSelector(({ sessionUser }) => sessionUser);

  const handleSignOut = () => {
    ReactGA.event({ action: 'sign out', category: 'Session' });
    dispatch(setToken(null));
  };

  if (session && !user) {
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
            <li><a onClick={handleSignOut}><i className="fa fa-sign-out" /> Sign Out</a></li>
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
