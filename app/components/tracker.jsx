import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect }   from 'react-redux';

import { DexComponent }                from './dex';
import { InfoComponent }               from './info';
import { NavComponent }                from './nav';
import { NotFoundComponent }           from './not-found';
import { ReloadComponent }             from './reload';
import { checkVersion }                from '../actions/utils';
import { listCaptures }                from '../actions/capture';
import { retrieveDex, setCurrentDex }  from '../actions/dex';
import { retrieveUser }                from '../actions/user';
import { setCurrentPokemon }           from '../actions/pokemon';
import { setShowScroll, setShowShare } from '../actions/tracker';

export class Tracker extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount () {
    this.reset();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.reset(nextProps);
    }
  }

  reset (props) {
    const { checkVersion, listCaptures, params: { slug, username }, retrieveDex, retrieveUser, setCurrentDex, setCurrentPokemon, setShowScroll, setShowShare } = props || this.props;

    this.setState({ ...this.state, loading: true });

    checkVersion();
    setShowScroll(false);
    setShowShare(false);
    setCurrentPokemon(1);
    setCurrentDex(slug, username);

    retrieveUser(username)
    .then(() => retrieveDex(slug, username))
    .then((dex) => listCaptures(dex, username))
    .then(() => this.setState({ ...this.state, loading: false }))
    .catch(() => this.setState({ ...this.state, loading: false }));
  }

  render () {
    const { params: { username }, user } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
          <div className="loading">Loading...</div>
        </DocumentTitle>
      );
    }

    if (!user) {
      return <NotFoundComponent />;
    }

    return (
      <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
        <div className="tracker-container">
          <NavComponent />
          <ReloadComponent />
          <div className="tracker">
            <DexComponent />
            <InfoComponent />
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ currentUser, users }) {
  return { user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    listCaptures: (dex, username) => dispatch(listCaptures(dex, username)),
    retrieveDex: (slug, username) => dispatch(retrieveDex(slug, username)),
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setCurrentDex: (slug, username) => dispatch(setCurrentDex(slug, username)),
    setShowScroll: (show) => dispatch(setShowScroll(show)),
    setShowShare: (show) => dispatch(setShowShare(show))
  };
}

export const TrackerComponent = connect(mapStateToProps, mapDispatchToProps)(Tracker);
