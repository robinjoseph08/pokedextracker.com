import { useEffect, useState }      from 'react';
import { Link }                     from 'react-router-dom';
import { useHistory }               from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AlertComponent }  from './alert';
import { FooterComponent } from './footer';
import { NavComponent }    from './nav';
import { ReactGA }         from '../utils/analytics';
import { ReloadComponent } from './reload';
import { checkVersion }    from '../actions/utils';
import { login }           from '../actions/session';

export function LoginComponent () {
  const dispatch = useDispatch();

  const history = useHistory();

  const session = useSelector(({ session }) => session);

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login | Pokédex Tracker';
  }, []);

  useEffect(() => {
    if (session) {
      history.push(`/u/${session.username}`);
    }
  }, []);

  useEffect(() => {
    dispatch(checkVersion());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, password };

    setError(null);

    try {
      await dispatch(login(payload));
      ReactGA.event({ action: 'login', category: 'Session' });
      history.push(`/u/${username}`);
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0 });
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="login-container">
      <NavComponent />
      <ReloadComponent />
      <div className="form">
        <h1>Login</h1>
        <form className="form-column" onSubmit={handleSubmit}>
          <AlertComponent message={error} type="error" />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="form-control"
              id="username"
              maxLength="20"
              name="username"
              onChange={handleUsernameChange}
              placeholder="ashketchum10"
              required
              spellCheck="false"
              type="text"
              value={username}
            />
            <i className="fa fa-asterisk" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              maxLength="72"
              name="password"
              onChange={handlePasswordChange}
              placeholder="••••••••••••"
              required
              type="password"
              value={password}
            />
            <i className="fa fa-asterisk" />
          </div>
          <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right" /></button>
          <p>Don't have an account yet? <Link className="link" to="/register">Register here</Link>!</p>
        </form>
      </div>
      <FooterComponent />
    </div>
  );
}
