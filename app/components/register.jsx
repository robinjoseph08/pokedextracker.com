import slug                                                                 from 'slug';
import { FontAwesomeIcon }                                                  from '@fortawesome/react-fontawesome';
import { Link }                                                             from 'react-router-dom';
import { faAsterisk, faChevronDown, faLongArrowAltRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector }                                         from 'react-redux';
import { useEffect, useState }                                              from 'react';
import { useHistory }                                                       from 'react-router';

import { Alert }                                             from './alert';
import { Footer }                                            from './footer';
import { Nav }                                               from './nav';
import { ReactGA }                                           from '../utils/analytics';
import { Reload }                                            from './reload';
import { createUser }                                        from '../actions/user';
import { friendCode3dsFormatter, friendCodeSwitchFormatter } from '../utils/formatting';
import { listGames }                                         from '../actions/game';
import { setNotification }                                   from '../actions/utils';

export function Register () {
  const dispatch = useDispatch();

  const history = useHistory();

  const games = useSelector(({ games }) => games);
  const gamesById = useSelector(({ gamesById }) => gamesById);
  const session = useSelector(({ session }) => session);

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [friendCode3ds, setFriendCode3ds] = useState('');
  const [friendCodeSwitch, setFriendCodeSwitch] = useState('');
  const [title, setTitle] = useState('');
  const [game, setGame] = useState(games[0] && games[0].id);
  const [regional, setRegional] = useState(games[0] ? !games[0].game_family.national_support : false);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    document.title = 'Register | Pokédex Tracker';
  }, []);

  useEffect(() => {
    if (session) {
      history.push(`/u/${session.username}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!session) {
        const g = await dispatch(listGames());
        setGame(g[0].id);
        setRegional(!g[0].game_family.national_support);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
      password_confirm: passwordConfirm,
      friend_code_3ds: friendCode3ds,
      friend_code_switch: friendCodeSwitch,
      title,
      shiny,
      game,
      regional
    };

    setError(null);

    try {
      await dispatch(createUser(payload));
      ReactGA.event({ action: 'register', category: 'Session' });
      dispatch(setNotification(true));
      history.push(`/u/${username}/${slug(title, { lower: true })}`);
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0 });
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);
  const handleFriendCode3dsChange = (e) => setFriendCode3ds(friendCode3dsFormatter(e.target.value));
  const handleFriendCodeSwitchChange = (e) => setFriendCodeSwitch(friendCodeSwitchFormatter(e.target.value));
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleGameChange = (e) => {
    const newGame = e.target.value;

    if (!gamesById[newGame].game_family.regional_support) {
      setRegional(false);
    }

    if (!gamesById[newGame].game_family.national_support) {
      setRegional(true);
    }

    setGame(newGame);
  };

  if (!game) {
    return null;
  }

  return (
    <div className="register-container">
      <Nav />
      <Reload />
      <div className="form register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-column">
            <Alert message={error} type="error" />
          </div>

          <div className="form-row">
            <div className="form-column">
              <h2>Account Info</h2>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={handleUsernameChange}
                  placeholder="ashketchum10"
                  required
                  spellCheck="false"
                  type="text"
                  value={username}
                />
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
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
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm">Confirm Password</label>
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
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
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
            </div>

            <div className="form-column">
              <h2>
                First Dex Info
                <div className="tooltip">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span className="tooltip-text">You can track multiple dexes on our app! This sets the settings for the first dex on your account.</span>
                </div>
              </h2>
              <div className="form-group">
                <label htmlFor="dex_title">Title</label>
                <input
                  className="form-control"
                  id="dex_title"
                  maxLength="300"
                  name="dex_title"
                  onChange={handleTitleChange}
                  placeholder="Living Dex"
                  required
                  type="text"
                  value={title}
                />
                <FontAwesomeIcon icon={faAsterisk} />
              </div>
              <div className="form-group">
                <label htmlFor="game">Game</label>
                <select
                  className="form-control"
                  onChange={handleGameChange}
                  value={game}
                >
                  {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
                </select>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div className="form-group">
                <label htmlFor="regional">Regionality</label>
                <div className={`radio ${gamesById[game].game_family.national_support ? '' : 'disabled'}`}>
                  <label title={gamesById[game].game_family.national_support ? '' : 'National dex is not supported for this game at this time.'}>
                    <input
                      checked={!regional}
                      disabled={!gamesById[game].game_family.national_support}
                      name="regional"
                      onChange={() => setRegional(false)}
                      type="radio"
                    />
                    <span className="radio-custom"><span /></span>National
                  </label>
                </div>
                <div className={`radio ${gamesById[game].game_family.regional_support ? '' : 'disabled'}`}>
                  <label title={gamesById[game].game_family.regional_support ? '' : 'Regional dex is not supported for this game at this time.'}>
                    <input
                      checked={regional}
                      disabled={!gamesById[game].game_family.regional_support}
                      name="regional"
                      onChange={() => setRegional(true)}
                      type="radio"
                    />
                    <span className="radio-custom"><span /></span>Regional
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <div className="radio">
                  <label>
                    <input
                      checked={!shiny}
                      name="type"
                      onChange={() => setShiny(false)}
                      type="radio"
                    />
                    <span className="radio-custom"><span /></span>Normal
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      checked={shiny}
                      name="type"
                      onChange={() => setShiny(true)}
                      type="radio"
                    />
                    <span className="radio-custom"><span /></span>Shiny
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-column">
            <button className="btn btn-blue" type="submit">Let's go! <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
            <p>Already have an account? <Link className="link" to="/login">Login here</Link>!</p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
