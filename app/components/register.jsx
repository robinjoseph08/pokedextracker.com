import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';

import { AlertComponent }                from './alert';
import { FooterComponent }               from './footer';
import { NavComponent }                  from './nav';
import { ReactGA }                       from '../utils/analytics';
import { ReloadComponent }               from './reload';
import { checkVersion, setNotification } from '../actions/utils';
import { createUser }                    from '../actions/user';
import { friendCode }                    from '../utils/formatting';
import { listGames }                     from '../actions/game';

const NATIONAL_ONLY_GAMES = ['x', 'y', 'omega_ruby', 'alpha_sapphire'];

export class Register extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null, game: 'ultra_sun', regional: false };
  }

  componentWillMount (props) {
    const { listGames, redirectToProfile, session } = props || this.props;

    if (session) {
      redirectToProfile(session.username);
    }

    listGames();
  }

  onChange = (e) => {
    const game = e.target.value;

    if (NATIONAL_ONLY_GAMES.indexOf(game) > -1) {
      this.setState({ regional: false });
    }

    this.setState({ game });
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  register = (e) => {
    e.preventDefault();

    const { register, setNotification } = this.props;
    const { game, regional } = this.state;
    const username = this._username.value;
    const password = this._password.value;
    const password_confirm = this._password_confirm.value;
    const friend_code = this._friend_code.value;
    const title = this._title.value;
    const shiny = this._shiny.checked;

    this.setState({ error: null });

    register({ username, password, password_confirm, friend_code, title, shiny, game, regional })
    .then(() => {
      ReactGA.event({ action: 'register', category: 'Session' });
      setNotification(true);
    })
    .catch((err) => {
      this.setState({ error: err.message });
      this.scrollToTop();
    });
  }

  render () {
    const { games } = this.props;
    const { error, game, regional } = this.state;

    return (
      <DocumentTitle title="Register | Pokédex Tracker">
        <div className="register-container">
          <NavComponent />
          <ReloadComponent />
          <div className="form register" ref={(c) => this._form = c}>
            <h1>Register</h1>
            <form onSubmit={this.register}>
              <div className="form-column">
                <AlertComponent message={error} type="error" />
              </div>

              <div className="form-row">
                <div className="form-column">
                  <h2>Account Info</h2>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" ref={(c) => this._username = c} name="username" id="username" type="text" required placeholder="ashketchum10" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" ref={(c) => this._password = c} name="password" id="password" type="password" required placeholder="••••••••••••" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <input className="form-control" ref={(c) => this._password_confirm = c} name="password_confirm" id="password_confirm" type="password" required placeholder="••••••••••••" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="friend_code">Friend Code</label>
                    <input className="form-control" ref={(c) => this._friend_code = c} name="friend_code" id="friend_code" type="text" placeholder="XXXX-XXXX-XXXX" onChange={(e) => this._friend_code.value = friendCode(e.target.value)} />
                  </div>
                </div>

                <div className="form-column">
                  <h2>
                    First Dex Info
                    <div className="tooltip">
                      <i className="fa fa-question-circle" />
                      <span className="tooltip-text">You can track multiple dexes on our app! This sets the settings for the first dex on your account.</span>
                    </div>
                  </h2>
                  <div className="form-group">
                    <label htmlFor="dex_title">Title</label>
                    <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="game">Game</label>
                    <select className="form-control" onChange={this.onChange} value={game}>
                      {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
                    </select>
                    <i className="fa fa-chevron-down" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regional">Regionality</label>
                    <div className="radio">
                      <label>
                        <input type="radio" name="regional" checked={!regional} value="national" onChange={() => this.setState({ regional: false })} />
                        <span className="radio-custom"><span /></span>National
                      </label>
                    </div>
                    <div className={`radio ${game === 'omega_ruby' ? 'disabled' : ''}`}>
                      <label title={game === 'omega_ruby' ? 'Regional dexes only supported for Gen 7.' : ''}>
                        <input type="radio" name="regional" checked={regional} disabled={game === 'omega_ruby'} value="regional" onChange={() => this.setState({ regional: true })} />
                        <span className="radio-custom"><span /></span>Regional
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <div className="radio">
                      <label>
                        <input type="radio" name="type" defaultChecked />
                        <span className="radio-custom"><span /></span>Normal
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input ref={(c) => this._shiny = c} type="radio" name="type" />
                        <span className="radio-custom"><span /></span>Shiny
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-column">
                <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right" /></button>
                <p>Already have an account? <Link className="link" to="/login">Login here</Link>!</p>
              </div>
            </form>
          </div>
          <FooterComponent />
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ games, session }) {
  return { games, session };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    listGames: () => dispatch(listGames()),
    register: (payload) => dispatch(createUser(payload)),
    redirectToProfile: (username) => dispatch(push(`/u/${username}/`)),
    setNotification: (value) => dispatch(setNotification(value))
  };
}

export const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(Register);
