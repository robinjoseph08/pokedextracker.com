import { Component } from 'react';
import { connect }   from 'react-redux';

import { DexComponent }                 from './dex';
import { InfoComponent }                from './info';
import { NavComponent }                 from './nav';
import { NotFoundComponent }            from './not-found';
import { setCurrentPokemon }            from '../actions/pokemon';
import { retrieveUser, setCurrentUser } from '../actions/user';

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
    const { params: { username }, retrieveUser, setCurrentPokemon, setCurrentUser } = this.props;

    setCurrentPokemon(1);
    setCurrentUser(username);
    retrieveUser(username);
  }

  render () {
    const { loading, user } = this.props;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!user) {
      return <NotFoundComponent></NotFoundComponent>;
    }

    return (
      <div className="tracker-container">
        <NavComponent></NavComponent>
        <div className="tracker">
          <DexComponent></DexComponent>
          <InfoComponent></InfoComponent>
        </div>
      </div>
    );
  }

}

function mapStateToProps ({ loading, users }, { params: { username } }) {
  return { loading: loading.tracker, user: users[username] };
}

function mapDispatchToProps (dispatch) {
  return {
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setCurrentUser: (username) => dispatch(setCurrentUser(username))
  };
}

export const TrackerComponent = connect(mapStateToProps, mapDispatchToProps)(Tracker);
