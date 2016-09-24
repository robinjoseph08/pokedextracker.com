import { Component } from 'react';

export class ShareComponent extends Component {

  render () {
    const { show, username } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="share" onClick={(e) => e.stopPropagation()}>
        Share this Living Dex:
        <input ref="share" value={`https://pokedextracker.com/u/${username}`} readOnly onClick={() => this.refs.share.select()} />
      </div>
    );
  }

}
