import { useDispatch, useSelector } from 'react-redux';
import { useEffect }                from 'react';

import { DexIndicatorComponent } from './dex-indicator';
import { DonatedFlairComponent } from './donated-flair';
import { ReactGA }               from '../utils/analytics';
import { ShareComponent }        from './share';
import { setShowShare }          from '../actions/tracker';

export function HeaderComponent ({ profile }) {
  const dispatch = useDispatch();

  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser].dexesBySlug[currentDex]);
  const session = useSelector(({ session }) => session);
  const showShare = useSelector(({ showShare }) => showShare);
  const user = useSelector(({ currentUser, users }) => users[currentUser]);

  useEffect(() => {
    const closeShare = () => dispatch(setShowShare(false));

    window.addEventListener('click', closeShare);

    return () => window.removeEventListener('click', closeShare);
  }, []);

  const handleShareClick = (e) => {
    e.stopPropagation();

    ReactGA.event({ action: showShare ? 'close' : 'open', category: 'Share' });

    dispatch(setShowShare(!showShare));
  };

  const handleTweetClick = () => ReactGA.event({ action: 'click tweet', category: 'Share' });

  const ownPage = session && session.id === user.id;

  return (
    <div className="header-row">
      <h1>
        {profile ? `${user.username}'s Profile` : dex.title}
        <div className="share-container">
          <a onClick={handleShareClick}>
            <i className="fa fa-link" />
            <ShareComponent profile={profile} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=Check out ${ownPage ? 'my' : `${user.username}'s`} ${profile ? 'profile' : 'living dex progress'} on @PokedexTracker! https://pokedextracker.com/u/${user.username}${profile ? '' : `/${dex.slug}`}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTweetClick}
          >
            <i className="fa fa-twitter" />
          </a>
        </div>
      </h1>
      {profile && <DonatedFlairComponent />}
      <DexIndicatorComponent dex={dex} />
    </div>
  );
};
