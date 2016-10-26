import { Component } from 'react';
import { Link }      from 'react-router';
import DocumentTitle from 'react-document-title';
import { connect }   from 'react-redux';

import { ReactGA }         from '../utils/analytics';
import { NavComponent }    from './nav';
import { ReloadComponent } from './reload';
import { checkVersion }    from '../actions/utils';

export class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount () {
    this.reset();
  }

  componentWillUpdate (props) {
    this.reset(props);
  }

  reset (props) {
    const { checkVersion } = props || this.props;

    checkVersion();
  }

  render () {
    return (
      <DocumentTitle title="cabrioles's Profile | Pokédex Tracker">
        <div className="profile-container">
          <NavComponent />
          <ReloadComponent />
          <div className="profile">
            {/* header component */}
            <header>
              <h1>cabrioles's Profile</h1>
              <div className="share-container">
                <a><i className="fa fa-link" /></a>
                {/* share component */}
              </div>

              <h2>
                FC: 1234-1234-1234 <Link to="/account" onClick={() => ReactGA.event({ action: 'click edit friend code', category: 'User' })}><i className="fa fa-pencil" /></Link>
              </h2>

              <div className="dex-preview">
                <div className="dex-preview-header">
                  <h3><Link to="/" className="link">My Cool Living Dex</Link></h3>
                  <Link to=""><i className="fa fa-pencil" /></Link>
                </div>
                <div className="percentage">
                  {/* progress component */}
                  <div className="progress-container">
                    <div className="progress-outer">
                      <div className="progress-numbers"><b>7.1%</b> done!<span className="mobile"> (<b>50</b> caught, <b>671</b> to go)</span></div>
                      <div className="progress-inner" style={{ width: '7.1%' }} />
                    </div>
                    <h3>(<b>50</b> caught, <b>671</b> to go)</h3>
                  </div>
                </div>
              </div>

              <div className="dex-preview">
                <div className="dex-preview-header">
                  <h3><Link to="/" className="link">My Shiny Living Dex WOW</Link></h3>
                  <Link to=""><i className="fa fa-pencil" /></Link>
                </div>
                <div className="percentage">
                  {/* progress component */}
                  <div className="progress-container">
                    <div className="progress-outer">
                      <div className="progress-numbers"><b>83.2%</b> done!<span className="mobile"> (<b>600</b> caught, <b>121</b> to go)</span></div>
                      <div className="progress-inner" style={{ width: '83.2%' }} />
                    </div>
                    <h3>(<b>600</b> caught, <b>121</b> to go)</h3>
                  </div>
                </div>
              </div>

              <div className="dex-create">
                <Link className="btn btn-blue" to="">Create a New Dex <i className="fa fa-long-arrow-right" /></Link>
              </div>
            </header>
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
    checkVersion: () => dispatch(checkVersion())
  };
}

export const ProfileComponent = connect(mapStateToProps, mapDispatchToProps)(Profile);
