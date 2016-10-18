import { Component } from 'react';

import { ReactGA } from '../utils/analytics';

export class ShareComponent extends Component {

  handleClick = () => {
    ReactGA.event({ action: 'select link', category: 'Share' });

    this._share.select();
  }

  render () {
    const { show, username } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="share" onClick={(e) => e.stopPropagation()}>
        Share this Living Dex:
        <input ref={(c) => this._share = c} value={`https://pokedextracker.com/u/${username}`} readOnly onClick={this.handleClick} />
      </div>
    );
  }

}
