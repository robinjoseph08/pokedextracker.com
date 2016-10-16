import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect }   from 'react-redux';

import { DexComponent }                 from './dex';
import { InfoComponent }                from './info';
import { NavComponent }                 from './nav';
import { NotFoundComponent }            from './not-found';
import { ReloadComponent }              from './reload';
import { checkVersion }                 from '../actions/utils';
import { retrieveUser, setCurrentUser } from '../actions/user';
import { setCurrentPokemon }            from '../actions/pokemon';
import { setShowScroll }                from '../actions/tracker';

export class Tracker extends Component {

  componentDidMount () {
    this.reset();
  }

  componentDidUpdate ({ params: { username } }) {
    if (username !== this.props.params.username) {
      this.reset();
    }
  }

  reset () {
    const { checkVersion, params: { username }, retrieveUser, setCurrentPokemon, setCurrentUser } = this.props;

    checkVersion();
    setShowScroll(false);
    setCurrentPokemon(1);
    setCurrentUser(username);
    retrieveUser(username);
  }

  render () {
    const { loading, params: { username }, user } = this.props;

    if (loading) {
      return (
        <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
          <div className="loading">Loading...</div>
        </DocumentTitle>
      );
    }

    if (!user) {
      return <NotFoundComponent></NotFoundComponent>;
    }

    return (
      <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
        <div className="tracker-container">
          <NavComponent></NavComponent>
          <ReloadComponent></ReloadComponent>
          <div className="tracker">
            <DexComponent></DexComponent>
            <InfoComponent></InfoComponent>
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ loading, users }, { params: { username } }) {
  return { loading: loading.tracker, user: users[username] };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setCurrentUser: (username) => dispatch(setCurrentUser(username)),
    setShowScroll: (show) => dispatch(setShowScroll(show))
  };
}

export const TrackerComponent = connect(mapStateToProps, mapDispatchToProps)(Tracker);
