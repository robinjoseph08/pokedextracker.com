import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ProgressComponent } from './progress';
import { RegionComponent }   from './region';
import { ShareComponent }    from './share';
import { setShareOpen }      from '../actions/tracker';

export class Header extends Component {

  componentDidMount () {
    window.addEventListener('click', this.closeShareOpen);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.closeShareOpen);
  }

  closeShareOpen = () => {
    this.props.setShareOpen(false);
  }

  toggleShareOpen = (e) => {
    e.stopPropagation();
    this.props.setShareOpen(!this.props.shareOpen);
  }

  render () {
    const { session, shareOpen, user } = this.props;
    const ownPage = session && session.id === user.id;

    return (
      <header>
        <h1>{ownPage ? null : 'Viewing '}{user.username}'s Living Dex</h1>
        <div className="share-container">
          <a onClick={this.toggleShareOpen}><i className="fa fa-link"></i></a>
          <a href="http://twitter.com/home/?status=Check out {ownPage ? 'my' : user.username + '\'s'} living dex progress on @PokedexTracker! https://pokedextracker.com/u/{user.username}" target="_blank"><i className="fa fa-twitter"></i></a>
          <ShareComponent show={shareOpen} username={user.username}></ShareComponent>
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

function mapStateToProps ({ currentUser, session, shareOpen, users }) {
  return { session, shareOpen, user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    setShareOpen: (open) => dispatch(setShareOpen(open))
  };
}

export const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(Header);
