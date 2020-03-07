import throttle                                     from 'lodash/throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector }                 from 'react-redux';
import { useParams }                                from 'react-router';

import { DexComponent }                           from './dex';
import { FooterComponent }                        from './footer';
import { InfoComponent }                          from './info';
import { NavComponent }                           from './nav';
import { NotFoundComponent }                      from './not-found';
import { ReloadComponent }                        from './reload';
import { SCROLL_DEBOUNCE, SHOW_SCROLL_THRESHOLD } from './scroll';
import { SearchBarComponent }                     from './search-bar';
import { checkVersion }                           from '../actions/utils';
import { clearPokemon, setCurrentPokemon }        from '../actions/pokemon';
import { listCaptures }                           from '../actions/capture';
import { retrieveDex, setCurrentDex }             from '../actions/dex';
import { retrieveUser, setUser }                  from '../actions/user';
import { setShowScroll, setShowShare }            from '../actions/tracker';

export function TrackerComponent () {
  const dispatch = useDispatch();

  const { slug, username } = useParams();

  const trackerRef = useRef(null);

  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser] && users[currentUser].dexesBySlug[currentDex]);
  const query = useSelector(({ query }) => query);
  const showScroll = useSelector(({ showScroll }) => showScroll);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `${username}'s Living Dex | Pokédex Tracker`;
  }, []);

  useEffect(() => {
    if (trackerRef.current) {
      trackerRef.current.scrollTop = 0;
    }
  }, [query]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      dispatch(checkVersion());
      dispatch(clearPokemon());
      dispatch(setShowScroll(false));
      dispatch(setShowShare(false));
      dispatch(setCurrentDex(slug, username));

      const u = await dispatch(retrieveUser(username));
      dispatch(setUser(u));
      const d = await dispatch(retrieveDex(slug, username));
      const captures = await dispatch(listCaptures(d, username));
      dispatch(setCurrentPokemon(captures[0].pokemon.id));

      setIsLoading(false);
    })();
  }, [slug, username]);

  const handleScroll = throttle(() => {
    if (!showScroll && trackerRef.current.scrollTop >= SHOW_SCROLL_THRESHOLD) {
      dispatch(setShowScroll(true));
    } else if (showScroll && trackerRef.current.scrollTop < SHOW_SCROLL_THRESHOLD) {
      dispatch(setShowScroll(false));
    }
  }, SCROLL_DEBOUNCE);

  const handleScrollButtonClick = useCallback(() => trackerRef.current.scrollTop = 0, [trackerRef.current]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!dex) {
    return <NotFoundComponent />;
  }

  return (
    <div className="tracker-container">
      <NavComponent />
      <ReloadComponent />
      <div className="tracker">
        <div className="dex-wrapper">
          <SearchBarComponent />
          <div className="dex-column" onScroll={handleScroll} ref={trackerRef}>
            <DexComponent onScrollButtonClick={handleScrollButtonClick} />
            <FooterComponent />
          </div>
        </div>
        <InfoComponent />
      </div>
    </div>
  );
}
