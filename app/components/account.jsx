import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState }      from 'react';
import { useHistory }               from 'react-router';

import { AlertComponent }                                    from './alert';
import { FooterComponent }                                   from './footer';
import { NavComponent }                                      from './nav';
import { ReactGA }                                           from '../utils/analytics';
import { ReloadComponent }                                   from './reload';
import { checkVersion }                                      from '../actions/utils';
import { friendCode3dsFormatter, friendCodeSwitchFormatter } from '../utils/formatting';
import { updateUser }                                        from '../actions/user';

export function AccountComponent () {
  const dispatch = useDispatch();

  const history = useHistory();

  const session = useSelector(({ session }) => session);
  // If the session user hasn't been loaded yet, temporarily substitute it with
  // the normal session. If there are things that are expected to be in the
  // session user that isn't in the normal session (e.g. dexes), this could
  // cause some problems and might need to be reworked, but right now, it works.
  const user = useSelector(({ session, sessionUser }) => sessionUser || session);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [friendCode3ds, setFriendCode3ds] = useState(user && user.friend_code_3ds);
  const [friendCodeSwitch, setFriendCodeSwitch] = useState(user && user.friend_code_switch);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.title = 'Account | Pokédex Tracker';
  }, []);

  if (!session) {
    history.push('/login');
  }

  dispatch(checkVersion());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: session.username,
      payload: {
        password,
        password_confirm: passwordConfirm,
        friend_code_3ds: friendCode3ds,
        friend_code_switch: friendCodeSwitch
      }
    };

    setError(null);
    setIsLoading(true);
    setSuccess(null);

    try {
      await dispatch(updateUser(payload))
      ReactGA.event({ action: 'update', category: 'User' });
      setSuccess('Account settings saved!');
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    window.scrollTo({ top: 0 });
  };

  const handleChangePasswordClick = () => setIsEditingPassword(!isEditingPassword);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);
  const handleFriendCode3dsChange = (e) => setFriendCode3ds(friendCode3dsFormatter(e.target.value));
  const handleFriendCodeSwitchChange = (e) => setFriendCodeSwitch(friendCodeSwitchFormatter(e.target.value));

  return (
    <div className="account-container">
      <NavComponent />
      <ReloadComponent />
      <div className="form">
        <h1>{user.username}'s Account</h1>
        <form onSubmit={handleSubmit} className="form-column">
          <AlertComponent message={error} type="error" />
          <AlertComponent message={success} type="success" />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <button
              className="btn btn-inline btn-yellow"
              onClick={handleChangePasswordClick}
              type="button"
            >
              {isEditingPassword ? 'Cancel' : 'Change'}
            </button>
          </div>
          {isEditingPassword &&
            <div>
              <div className="form-group">
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handlePasswordChange}
                  placeholder="••••••••••••"
                  required
                  type="password"
                  value={password}
                />
                <i className="fa fa-asterisk" />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  id="password_confirm"
                  name="password_confirm"
                  onChange={handlePasswordConfirmChange}
                  placeholder="••••••••••••"
                  required
                  type="password"
                  value={passwordConfirm}
                />
                <i className="fa fa-asterisk" />
              </div>
            </div>
          }
          <div className="form-group">
            <label htmlFor="friend_code_3ds">3DS Friend Code</label>
            <input
              className="form-control"
              id="friend_code_3ds"
              name="friend_code_3ds"
              onChange={handleFriendCode3dsChange}
              placeholder="XXXX-XXXX-XXXX"
              type="text"
              value={friendCode3ds}
            />
          </div>
          <div className="form-group">
            <label htmlFor="friend_code_switch">Switch Friend Code</label>
            <input
              className="form-control"
              id="friend_code_switch"
              name="friend_code_switch"
              onChange={handleFriendCodeSwitchChange}
              placeholder="SW-XXXX-XXXX-XXXX"
              type="text"
              value={friendCodeSwitch}
            />
          </div>
          <div className="form-group">
            <label htmlFor="language">Pokémon Name Language</label>
            <select className="form-control">
              <option>English</option>
            </select>
            <i className="fa fa-chevron-down" />
          </div>
          <button className="btn btn-blue" type="submit">
            <span className={isLoading ? 'hidden' : ''}>Save <i className="fa fa-long-arrow-right" /></span>
            {isLoading ? <span className="spinner"><i className="fa fa-spinner fa-spin" /></span> : null}
          </button>
        </form>
      </div>
      <FooterComponent />
    </div>
  );
}
