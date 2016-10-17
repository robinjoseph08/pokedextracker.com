import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';

import { AlertComponent }         from './alert';
import { NavComponent }           from './nav';
import { ReloadComponent }        from './reload';
import { checkVersion, setError } from '../actions/utils';
import { createUser }             from '../actions/user';
import { friendCode }             from '../utils/formatting';

export class Register extends Component {

  componentWillMount () {
    const { checkVersion, redirectToTracker, session } = this.props;

    if (session) {
      redirectToTracker(session.username);
    }

    checkVersion();
  }

  componentDidMount () {
    this.props.clearError();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const username = this._username.value;
    const password = this._password.value;
    const password_confirm = this._password_confirm.value;
    const friend_code = this._friend_code.value;

    this.props.onSubmit({ username, password, password_confirm, friend_code });
  }

  render () {
    const { error } = this.props;

    return (
      <DocumentTitle title="Register | Pokédex Tracker">
        <div className="register-container">
          <NavComponent></NavComponent>
          <ReloadComponent></ReloadComponent>
          <div className="form">
            <h1>Register</h1>
            <form onSubmit={this.onSubmit}>
              <AlertComponent message={error} type="error"></AlertComponent>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref={(c) => this._username = c} name="username" id="username" type="text" required placeholder="ashketchum10" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                <i className="fa fa-asterisk"></i>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref={(c) => this._password = c} name="password" id="password" type="password" required placeholder="••••••••••••" />
                <i className="fa fa-asterisk"></i>
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm">Confirm Password</label>
                <input ref={(c) => this._password_confirm = c} name="password_confirm" id="password_confirm" type="password" required placeholder="••••••••••••" />
                <i className="fa fa-asterisk"></i>
              </div>
              <div className="form-group">
                <label htmlFor="friend_code">Friend Code</label>
                <input ref={(c) => this._friend_code = c} name="friend_code" id="friend_code" type="text" placeholder="XXXX-XXXX-XXXX" onChange={(e) => this._friend_code.value = friendCode(e.target.value)} />
              </div>
              <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right"></i></button>
              <p>Already have an account? <Link className="link" to="/login">Login here</Link>!</p>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ error, session }) {
  return { error, session };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    clearError: () => dispatch(setError(null)),
    onSubmit: (payload) => dispatch(createUser(payload)),
    redirectToTracker: (username) => dispatch(push(`/u/${username}`))
  };
}

export const RegisterComponent = connect(mapStateToProps, mapDispatchToProps)(Register);
