import { FontAwesomeIcon }                                from '@fortawesome/react-fontawesome';
import { Link }                                           from 'react-router-dom';
import { faCaretDown, faCog, faSignOutAlt, faTh, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector }                       from 'react-redux';

import { ReactGA }  from '../utils/analytics';
import { setToken } from '../actions/session';

export function Nav () {
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
        <a href="https://www.patreon.com/pokedextracker" rel="noopener noreferrer" target="_blank">Patreon</a>
        <div className="dropdown">
          <a href="#">{session.username} <FontAwesomeIcon icon={faCaretDown} /></a>
          <ul>
            <div className="dropdown-scroll">
              {user.dexes.map((dex) => <li key={dex.id}><Link to={`/u/${session.username}/${dex.slug}`}><FontAwesomeIcon icon={faTh} /> {dex.title}</Link></li>)}
            </div>
            <li><Link to={`/u/${session.username}`}><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
            <li><Link to="/account"><FontAwesomeIcon icon={faCog} /> Account Settings</Link></li>
            <li><a onClick={handleSignOut}><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</a></li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/">Pokédex Tracker</Link>
      <a href="https://www.patreon.com/pokedextracker" rel="noopener noreferrer" target="_blank">Patreon</a>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
