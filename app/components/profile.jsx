import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState }      from 'react';
import { useParams }                from 'react-router';

import { DexCreateComponent }                    from './dex-create';
import { DexPreviewComponent }                   from './dex-preview';
import { FooterComponent }                       from './footer';
import { FriendCodeComponent }                   from './friend-code';
import { HeaderComponent }                       from './header';
import { NavComponent }                          from './nav';
import { NotFoundComponent }                     from './not-found';
import { NotificationComponent }                 from './notification';
import { ReloadComponent }                       from './reload';
import { checkVersion }                          from '../actions/utils';
import { listGames }                             from '../actions/game';
import { retrieveUser, setCurrentUser, setUser } from '../actions/user';
import { setShowShare }                          from '../actions/tracker';

export function ProfileComponent () {
  const dispatch = useDispatch();

  const { username } = useParams();

  const session = useSelector(({ session }) => session);
  const user = useSelector(({ currentUser, users }) => users[currentUser]);

  const [isLoading, setIsLoading] = useState(true);
  const [showDexCreate, setShowDexCreate] = useState(false);

  const reload = async () => {
    setIsLoading(true);

    dispatch(checkVersion());
    dispatch(setCurrentUser(username));
    dispatch(setShowShare(false));

    const [u] = await Promise.all([
      dispatch(retrieveUser(username)),
      dispatch(listGames())
    ]);

    dispatch(setUser(u));
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = `${username}'s Profile | Pokédex Tracker`;
  }, []);

  useEffect(() => {
    reload();
  }, [username]);

  const handleCreateNewDexClick = () => setShowDexCreate(true);
  const handleDexCreateRequestClose = () => setShowDexCreate(false);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <NotFoundComponent />;
  }

  const ownPage = session && session.id === user.id;

  return (
    <div className="profile-container">
      <NavComponent />
      <ReloadComponent />
      <div className="profile">
        <div className="wrapper">
          <header>
            <NotificationComponent />
            <HeaderComponent profile />
            <FriendCodeComponent />
          </header>

          {user.dexes.map((dex) => <DexPreviewComponent dex={dex} key={dex.id} reload={reload} />)}

          {ownPage &&
            <div className="dex-create">
              <div className="btn btn-blue" onClick={handleCreateNewDexClick}>Create a New Dex <i className="fa fa-long-arrow-right" /></div>
              <DexCreateComponent isOpen={showDexCreate} onRequestClose={handleDexCreateRequestClose} />
            </div>
          }
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
