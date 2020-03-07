import PropTypes       from 'prop-types';
import { Link }        from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState }    from 'react';

import { DexEditComponent }      from './dex-edit';
import { DexIndicatorComponent } from './dex-indicator';
import { ProgressComponent }     from './progress';

export function DexPreviewComponent ({ dex, reload }) {
  const session = useSelector(({ session }) => session);
  const user = useSelector(({ currentUser, users }) => users[currentUser]);

  const [showEditDex, setShowEditDex] = useState(false);

  const handleRequestClose = (shouldReload) => {
    setShowEditDex(false);

    if (shouldReload) {
      reload();
    }
  };

  const handleEditClick = () => setShowEditDex(true);

  const ownPage = session && session.id === user.id;

  return (
    <div className="dex-preview">
      <div className="dex-preview-header">
        <h3><Link className="link" to={`/u/${user.username}/${dex.slug}`}>{dex.title}</Link></h3>
        {ownPage &&
          <div className="dex-edit">
            <a className="link" onClick={handleEditClick}><i className="fa fa-pencil" /></a>
            <DexEditComponent dex={dex} isOpen={showEditDex} onRequestClose={handleRequestClose} />
          </div>
        }
        <DexIndicatorComponent dex={dex} />
      </div>
      <div className="percentage">
        <ProgressComponent caught={dex.caught} total={dex.total} />
      </div>
    </div>
  );
}

DexPreviewComponent.propTypes = {
  dex: PropTypes.object.isRequired,
  reload: PropTypes.func.isRequired
};
