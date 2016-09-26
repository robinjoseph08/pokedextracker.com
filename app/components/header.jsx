import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ProgressComponent } from './progress';
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

  toggleShare = (e) => {
    e.stopPropagation();
    this.props.setShowShare(!this.props.showShare);
  }

  render () {
    const { session, showShare, user } = this.props;
    const ownPage = session && session.id === user.id;

    return (
      <header>
        <h1>{ownPage ? null : 'Viewing '}{user.username}'s Living Dex</h1>
        <div className="share-container">
          <a onClick={this.toggleShare}><i className="fa fa-link"></i></a>
          <a href="http://twitter.com/home/?status=Check out {ownPage ? 'my' : user.username + '\'s'} living dex progress on @PokedexTracker! https://pokedextracker.com/u/{user.username}" target="_blank"><i className="fa fa-twitter"></i></a>
          <ShareComponent show={showShare} username={user.username}></ShareComponent>
        </div>

        <h2>
          FC: <span className={user.friend_code ? '' : 'fc-missing'}>{user.friend_code || 'XXXX-XXXX-XXXX'}</span>
          {ownPage ? <Link to="/account"><i className="fa fa-pencil"></i></Link> : null}
        </h2>

        <RegionComponent></RegionComponent>

        <div className="percentage">
          <ProgressComponent></ProgressComponent>
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
