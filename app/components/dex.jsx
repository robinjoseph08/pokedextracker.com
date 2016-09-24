import { connect } from 'react-redux';

import { BOX_SIZE, BoxComponent } from './box';
import { HeaderComponent }        from './header';

export function Dex ({ captures }) {
  const groups = captures.reduce((all, capture, i) => {
    const group = Math.ceil((i + 1) / BOX_SIZE) - 1;
    all[group] = all[group] || [];
    all[group].push(capture);
    return all;
  }, []);

  return (
    <div className="dex">
      <HeaderComponent></HeaderComponent>
      {groups.map((group) => <BoxComponent key={group[0].pokemon.national_id} captures={group}></BoxComponent>)}
    </div>
  );
}

function mapStateToProps ({ currentUser, users }) {
  return { captures: users[currentUser].captures };
}

export const DexComponent = connect(mapStateToProps)(Dex);
