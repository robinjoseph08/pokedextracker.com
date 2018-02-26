import DocumentTitle from 'react-document-title';
import throttle      from 'lodash/throttle';
import { Component } from 'react';
import { connect }   from 'react-redux';

import { DexComponent }                           from './dex';
import { FooterComponent }                        from './footer';
import { InfoComponent }                          from './info';
import { NavComponent }                           from './nav';
import { NotFoundComponent }                      from './not-found';
import { ReloadComponent }                        from './reload';
import { SCROLL_DEBOUNCE, SHOW_SCROLL_THRESHOLD } from './scroll';
import { checkVersion }                           from '../actions/utils';
import { clearPokemon, setCurrentPokemon }        from '../actions/pokemon';
import { listCaptures }                           from '../actions/capture';
import { retrieveDex, setCurrentDex }             from '../actions/dex';
import { retrieveUser, setUser }                  from '../actions/user';
import { setShowScroll, setShowShare }            from '../actions/tracker';

export class Tracker extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount () {
    this.reset();
  }

  componentWillReceiveProps (nextProps) {
    const { slug, username } = this.props.params;
    const samePage = nextProps.params.username === username && nextProps.params.slug === slug;

    if (!samePage) {
      this.reset(nextProps);
    }
  }

  reset (props) {
    const {
      checkVersion,
      clearPokemon,
      listCaptures,
      params: { slug, username },
      retrieveDex,
      retrieveUser,
      setCurrentDex,
      setCurrentPokemon,
      setShowScroll,
      setShowShare,
      setUser
    } = props || this.props;

    this.setState({ ...this.state, loading: true });

    checkVersion();
    clearPokemon();
    setShowScroll(false);
    setShowShare(false);
    setCurrentDex(slug, username);

    retrieveUser(username)
    .then((user) => {
      setUser(user);
      return retrieveDex(slug, username);
    })
    .then((dex) => listCaptures(dex, username))
    .then((captures) => {
      setCurrentPokemon(captures[0].pokemon.id);
      this.setState({ ...this.state, loading: false });
    })
    .catch(() => this.setState({ ...this.state, loading: false }));
  }

  onScroll = () => {
    const { setShowScroll, showScroll } = this.props;

    if (!showScroll && this._tracker && this._tracker.scrollTop >= SHOW_SCROLL_THRESHOLD) {
      setShowScroll(true);
    } else if (showScroll && this._tracker && this._tracker.scrollTop < SHOW_SCROLL_THRESHOLD) {
      setShowScroll(false);
    }
  }

  render () {
    const { dex, params: { username } } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
          <div className="loading">Loading...</div>
        </DocumentTitle>
      );
    }

    if (!dex) {
      return <NotFoundComponent />;
    }

    return (
      <DocumentTitle title={`${username}'s Living Dex | Pokédex Tracker`}>
        <div className="tracker-container">
          <NavComponent />
          <ReloadComponent />
          <div className="tracker">
            <div className="tracker-left-column" ref={(c) => this._tracker = c} onScroll={throttle(this.onScroll, SCROLL_DEBOUNCE)}>
              <DexComponent onScrollButtonClick={() => this._tracker ? this._tracker.scrollTop = 0 : null} />
              <FooterComponent />
            </div>
            <InfoComponent />
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ currentDex, currentUser, showScroll, users }) {
  return {
    dex: users[currentUser] && users[currentUser].dexesBySlug[currentDex],
    showScroll
  };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    clearPokemon: () => dispatch(clearPokemon()),
    listCaptures: (dex, username) => dispatch(listCaptures(dex, username)),
    retrieveDex: (slug, username) => dispatch(retrieveDex(slug, username)),
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setCurrentDex: (slug, username) => dispatch(setCurrentDex(slug, username)),
    setShowScroll: (show) => dispatch(setShowScroll(show)),
    setShowShare: (show) => dispatch(setShowShare(show)),
    setUser: (user) => dispatch(setUser(user))
  };
}

export const TrackerComponent = connect(mapStateToProps, mapDispatchToProps)(Tracker);
