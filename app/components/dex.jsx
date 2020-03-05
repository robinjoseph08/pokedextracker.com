import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';

import { BoxComponent, DeferredBoxComponent } from './box';
import { DonatedFlairComponent }              from './donated-flair';
import { FriendCodeComponent }                from './friend-code';
import { HeaderComponent }                    from './header';
import { NotificationComponent }              from './notification';
import { ProgressComponent }                  from './progress';
import { ReactGA }                            from '../utils/analytics';
import { ScrollComponent }                    from './scroll';
import { SearchResultsComponent }             from './search-results';
import { groupBoxes }                         from '../utils/pokemon';

const BOX_COMPONENTS = {};
const DEFER_CUTOFF = 1;

export function Dex ({ captures, dex, onScrollButtonClick, query, username }) {
  const caught = captures.filter(({ captured }) => captured).length;
  const total = captures.length;

  if (query.length === 0) {
    const boxes = groupBoxes(captures);
    BOX_COMPONENTS[dex.id] = boxes.map((box, i) => {
      if (i > DEFER_CUTOFF) {
        return <DeferredBoxComponent key={box[0].pokemon.id} captures={box} />;
      }

      return <BoxComponent key={box[0].pokemon.id} captures={box} />;
    });
  }

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
        {query.length > 0 ? <SearchResultsComponent captures={captures} /> : BOX_COMPONENTS[dex.id]}
      </div>
    </div>
  );
}

function mapStateToProps ({ currentDex, currentUser, query, users }) {
  return {
    captures: users[currentUser].dexesBySlug[currentDex].captures,
    dex: users[currentUser].dexesBySlug[currentDex],
    query,
    username: currentUser
  };
}

export const DexComponent = connect(mapStateToProps)(Dex);
