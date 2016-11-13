import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';

import { AlertComponent }  from './alert';
import { NavComponent }    from './nav';
import { ReactGA }         from '../utils/analytics';
import { ReloadComponent } from './reload';
import { checkVersion }    from '../actions/utils';
import { login }           from '../actions/session';

export class Login extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null };
  }

  componentWillMount () {
    const { checkVersion, redirectToProfile, session } = this.props;

    if (session) {
      redirectToProfile(session.username);
    }

    checkVersion();
  }

  login = (e) => {
    e.preventDefault();

    const { login } = this.props;
    const username = this._username.value;
    const password = this._password.value;

    this.setState({ ...this.state, error: null });

    login({ username, password })
    .then(() => ReactGA.event({ action: 'login', category: 'Session' }))
    .catch((err) => this.setState({ ...this.state, error: err.message }));
  }

  render () {
    const { error } = this.state;

    return (
      <DocumentTitle title="Login | Pokédex Tracker">
        <div className="login-container">
          <NavComponent />
          <ReloadComponent />
          <div className="form">
            <h1>Login</h1>
            <form onSubmit={this.login}>
              <div className="form-column">
                <AlertComponent message={error} type="error" />
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input className="form-control" ref={(c) => this._username = c} name="username" id="username" type="text" required placeholder="cabrioles" maxLength="20" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                  <i className="fa fa-asterisk" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input className="form-control" ref={(c) => this._password = c} name="password" id="password" type="password" required placeholder="••••••••••••" maxLength="72" />
                  <i className="fa fa-asterisk" />
                </div>
                <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right" /></button>
                <p>Don't have an account yet? <Link className="link" to="/register">Register here</Link>!</p>
              </div>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    login: (payload) => dispatch(login(payload)),
    redirectToProfile: (username) => dispatch(push(`/u/${username}`))
  };
}

export const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
