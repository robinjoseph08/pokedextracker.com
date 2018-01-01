import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';
import throttle      from 'lodash/throttle';

import { BoxComponent }                                            from './box';
import { SCROLL_DEBOUNCE, SHOW_SCROLL_THRESHOLD, ScrollComponent } from './scroll';
import { DonatedFlairComponent }                                   from './donated-flair';
import { FriendCodeComponent }                                     from './friend-code';
import { HeaderComponent }                                         from './header';
import { ProgressComponent }                                       from './progress';
import { ReactGA }                                                 from '../utils/analytics';
import { groupBoxes }                                              from '../utils/pokemon';
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
    const { captures, dex, username } = this.props;

    const caught = captures.filter(({ captured }) => captured).length;
    const total = captures.length;
    const boxes = groupBoxes(captures, dex);

    return (
      <div className="dex" ref={(c) => this._dex = c} onScroll={throttle(this.onScroll, SCROLL_DEBOUNCE)}>
        <div className="wrapper">
          <ScrollComponent onClick={() => this._dex ? this._dex.scrollTop = 0 : null} />
          <header>
            <HeaderComponent />
            <h3>
              <Link to={`/u/${username}`} onClick={() => ReactGA.event({ action: 'click view profile', category: 'User' })}>/u/{username}</Link>
              <DonatedFlairComponent />
            </h3>
            <FriendCodeComponent />
          </header>
          <div className="percentage">
            <ProgressComponent caught={caught} total={total} />
          </div>
          {boxes.map((box) => <BoxComponent key={box[0].pokemon.id} captures={box} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ currentDex, currentUser, showScroll, users }) {
  return {
    captures: users[currentUser].dexesBySlug[currentDex].captures,
    dex: users[currentUser].dexesBySlug[currentDex],
    showScroll,
    username: currentUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setShowScroll: (show) => dispatch(setShowScroll(show))
  };
}

export const DexComponent = connect(mapStateToProps, mapDispatchToProps)(Dex);
