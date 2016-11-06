import { Component } from 'react';
import { connect }   from 'react-redux';

import { ReactGA } from '../utils/analytics';

export class Share extends Component {

  handleClick = () => {
    ReactGA.event({ action: 'select link', category: 'Share' });

    this._share.select();
  }

  render () {
    const { profile, showShare, slug, username } = this.props;

    if (!showShare) {
      return null;
    }

    return (
      <div className="share" onClick={(e) => e.stopPropagation()}>
        Share this {profile ? 'Profile' : 'Living Dex'}:
        <input ref={(c) => this._share = c} value={`https://pokedextracker.com/u/${username}${profile ? '' : `/${slug}`}`} readOnly onClick={this.handleClick} />
      </div>
    );
  }

}

function mapStateToProps ({ currentDex, currentUser, showShare }) {
  return { showShare, slug: currentDex, username: currentUser };
}

export const ShareComponent = connect(mapStateToProps)(Share);
