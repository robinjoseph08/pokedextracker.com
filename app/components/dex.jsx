import { Component } from 'react';
import { connect }   from 'react-redux';
import throttle      from 'lodash/throttle';

import { BOX_SIZE, BoxComponent }                                  from './box';
import { HeaderComponent }                                         from './header';
import { SCROLL_DEBOUNCE, SHOW_SCROLL_THRESHOLD, ScrollComponent } from './scroll';
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
    const { captures } = this.props;

    const groups = captures.reduce((all, capture, i) => {
      const group = Math.ceil((i + 1) / BOX_SIZE) - 1;
      all[group] = all[group] || [];
      all[group].push(capture);
      return all;
    }, []);

    return (
      <div className="dex" ref={(c) => this._dex = c} onScroll={throttle(this.onScroll, SCROLL_DEBOUNCE)}>
        <ScrollComponent onClick={() => this._dex ? this._dex.scrollTop = 0 : null} />
        <HeaderComponent />
        {groups.map((group) => <BoxComponent key={group[0].pokemon.national_id} captures={group} />)}
      </div>
    );
  }
}

function mapStateToProps ({ currentUser, showScroll, users }) {
  return { captures: users[currentUser].captures, showScroll };
}

function mapDispatchToProps (dispatch) {
  return {
    setShowScroll: (show) => dispatch(setShowScroll(show))
  };
}

export const DexComponent = connect(mapStateToProps, mapDispatchToProps)(Dex);
