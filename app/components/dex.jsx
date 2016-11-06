import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';
import throttle      from 'lodash/throttle';

import { BOX_SIZE, BoxComponent }                                  from './box';
import { SCROLL_DEBOUNCE, SHOW_SCROLL_THRESHOLD, ScrollComponent } from './scroll';
import { FriendCodeComponent }                                     from './friend-code';
import { HeaderComponent }                                         from './header';
import { ProgressComponent }                                       from './progress';
import { ReactGA }                                                 from '../utils/analytics';
import { RegionComponent }                                         from './region';
import { regionCheck }                                             from '../utils/pokemon';
import { setShowScroll }                                           from '../actions/tracker';

export class Dex extends Component {

  onScroll = () => {
    const { setShowScroll, showScroll } = this.props;

    if (!showScroll && this._dex && this._dex.scrollTop >= SHOW_SCROLL_THRESHOLD) {
      setShowScroll(true);
    } else if (showScroll && this._dex && this._dex.scrollTop < SHOW_SCROLL_THRESHOLD) {
      setShowScroll(false);
    }
  }

  render () {
    const { captures, region, username } = this.props;

    const caught = captures.filter(({ captured, pokemon }) => regionCheck(pokemon, region) && captured).length;
    const total = captures.filter(({ pokemon }) => regionCheck(pokemon, region)).length;
    const groups = captures.reduce((all, capture, i) => {
      const group = Math.ceil((i + 1) / BOX_SIZE) - 1;
      all[group] = all[group] || [];
      all[group].push(capture);
      return all;
    }, []);

    return (
      <div className="dex" ref={(c) => this._dex = c} onScroll={throttle(this.onScroll, SCROLL_DEBOUNCE)}>
        <div className="wrapper">
          <ScrollComponent onClick={() => this._dex ? this._dex.scrollTop = 0 : null} />
          <header>
            <HeaderComponent />
            <h3><Link to={`/u/${username}`} onClick={() => ReactGA.event({ action: 'click view profile', category: 'User' })}>/u/{username}</Link></h3>
            <FriendCodeComponent />
          </header>
          <RegionComponent />
          <div className="percentage">
            <ProgressComponent caught={caught} total={total} />
            <RegionComponent mobile={true} />
          </div>
          {groups.map((group) => <BoxComponent key={group[0].pokemon.national_id} captures={group} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ currentDex, currentUser, region, showScroll, users }) {
  return { captures: users[currentUser].dexesBySlug[currentDex].captures, region, showScroll, username: currentUser };
}

function mapDispatchToProps (dispatch) {
  return {
    setShowScroll: (show) => dispatch(setShowScroll(show))
  };
}

export const DexComponent = connect(mapStateToProps, mapDispatchToProps)(Dex);
