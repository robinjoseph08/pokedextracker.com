import { Link }        from 'react-router-dom';
import { useMemo }     from 'react';
import { useSelector } from 'react-redux';

import { BoxComponent }           from './box';
import { DonatedFlairComponent }  from './donated-flair';
import { FriendCodeComponent }    from './friend-code';
import { HeaderComponent }        from './header';
import { NotificationComponent }  from './notification';
import { ProgressComponent }      from './progress';
import { ReactGA }                from '../utils/analytics';
import { ScrollComponent }        from './scroll';
import { SearchResultsComponent } from './search-results';
import { groupBoxes }             from '../utils/pokemon';

const DEFER_CUTOFF = 1;

export function DexComponent ({ onScrollButtonClick }) {
  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser].dexesBySlug[currentDex]);
  const query = useSelector(({ query }) => query);
  const username = useSelector(({ currentUser }) => currentUser);

  const caught = useMemo(() => dex.captures.filter(({ captured }) => captured).length, [dex.captures]);
  const total = dex.captures.length;

  const boxes = useMemo(() => groupBoxes(dex.captures), [dex.captures]);
  const boxComponents = useMemo(() => {
    return boxes.map((box, i) => (
      <BoxComponent
        key={box[0].pokemon.id}
        captures={box}
        deferred={i > DEFER_CUTOFF}
      />
    ));
  }, [boxes]);

  return (
    <div className="dex">
      <div className="wrapper">
        <ScrollComponent onClick={onScrollButtonClick} />
        <NotificationComponent />
        <header>
          <HeaderComponent />
          <h3>
            <Link to={`/u/${username}`} onClick={() => ReactGA.event({ action: 'click view profile', category: 'User' })}>/u/{username}</Link>
            <DonatedFlairComponent />
          </h3>
          <FriendCodeComponent />
        </header>
        <div className="percentage">
          <ProgressComponent caught={caught} total={total} />
        </div>
        {query.length > 0 ? <SearchResultsComponent captures={dex.captures} /> : boxComponents}
      </div>
    </div>
  );
}
