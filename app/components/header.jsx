import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ProgressComponent } from './progress';
import { ReactGA }           from '../utils/analytics';
import { RegionComponent }   from './region';
import { ShareComponent }    from './share';
import { setShowShare }      from '../actions/tracker';

export class Header extends Component {

  componentDidMount () {
    window.addEventListener('click', this.closeShare);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.closeShare);
  }

  closeShare = () => {
    this.props.setShowShare(false);
  }

  toggleShare = (e, showShare) => {
    e.stopPropagation();

    const { setShowShare } = this.props;

    ReactGA.event({ action: showShare ? 'open' : 'close', category: 'Share' });

    setShowShare(showShare);
  }

  render () {
    const { session, showShare, user } = this.props;
    const ownPage = session && session.id === user.id;

    return (
      <header>
        <h1>{ownPage ? null : 'Viewing '}{user.username}'s Living Dex</h1>
        <div className="share-container">
          <a onClick={(e) => this.toggleShare(e, !showShare)}><i className="fa fa-link" /></a>
          <a href={`http://twitter.com/home/?status=Check out ${ownPage ? 'my' : `${user.username}'s`} living dex progress on @PokedexTracker! https://pokedextracker.com/u/${user.username}`} target="_blank" onClick={() => ReactGA.event({ action: 'click tweet', category: 'Share' })}><i className="fa fa-twitter" /></a>
          <ShareComponent show={showShare} username={user.username} />
        </div>

        <h2>
          FC: <span className={user.friend_code ? '' : 'fc-missing'}>{user.friend_code || 'XXXX-XXXX-XXXX'}</span>
          {ownPage ? <Link to="/account" onClick={() => ReactGA.event({ action: 'click edit friend code', category: 'User' })}><i className="fa fa-pencil" /></Link> : null}
        </h2>

        <RegionComponent />

        <div className="percentage">
          <ProgressComponent />
          <RegionComponent mobile={true} />
        </div>
      </header>
    );
  }

}

function mapStateToProps ({ currentUser, session, showShare, users }) {
  return { session, showShare, user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    setShowShare: (show) => dispatch(setShowShare(show))
  };
}

export const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(Header);
