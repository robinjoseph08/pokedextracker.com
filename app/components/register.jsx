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
import { createUser }      from '../actions/user';
import { friendCode }      from '../utils/formatting';

export class Register extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null };
  }

  componentWillMount () {
    const { checkVersion, redirectToTracker, session } = this.props;

    if (session) {
      redirectToTracker(session.username);
    }

    checkVersion();
  }

  register = (e) => {
    e.preventDefault();

    const { register } = this.props;
    const username = this._username.value;
    const password = this._password.value;
    const password_confirm = this._password_confirm.value;
    const friend_code = this._friend_code.value;

    this.setState({ ...this.state, error: null });

    register({ username, password, password_confirm, friend_code })
    .then(() => ReactGA.event({ action: 'register', category: 'Session' }))
    .catch((err) => this.setState({ ...this.state, error: err.message }));
  }

  render () {
    const { error } = this.state;

    return (
      <DocumentTitle title="Register | Pokédex Tracker">
        <div className="register-container">
          <NavComponent />
          <ReloadComponent />
          <div className="form">
            <h1>Register</h1>
            <form onSubmit={this.register}>
              <AlertComponent message={error} type="error" />
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref={(c) => this._username = c} name="username" id="username" type="text" required placeholder="ashketchum10" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                <i className="fa fa-asterisk" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref={(c) => this._password = c} name="password" id="password" type="password" required placeholder="••••••••••••" />
                <i className="fa fa-asterisk" />
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm">Confirm Password</label>
                <input ref={(c) => this._password_confirm = c} name="password_confirm" id="password_confirm" type="password" required placeholder="••••••••••••" />
                <i className="fa fa-asterisk" />
              </div>
              <div className="form-group">
                <label htmlFor="friend_code">Friend Code</label>
                <input ref={(c) => this._friend_code = c} name="friend_code" id="friend_code" type="text" placeholder="XXXX-XXXX-XXXX" onChange={(e) => this._friend_code.value = friendCode(e.target.value)} />
              </div>
              <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right" /></button>
              <p>Already have an account? <Link className="link" to="/login">Login here</Link>!</p>
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
    register: (payload) => dispatch(createUser(payload)),
    redirectToTracker: (username) => dispatch(push(`/u/${username}`))
  };
}

export const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(Register);
