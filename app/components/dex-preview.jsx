import { Link }    from 'react-router';
import { connect } from 'react-redux';

import { DexIndicatorComponent } from './dex-indicator';
import { ProgressComponent }     from './progress';

export function DexPreview ({ dex, username }) {
  return (
    <div className="dex-preview">
      <div className="dex-preview-header">
        <h3><Link to={`/u/${username}/${dex.slug}`} className="link">{dex.title}</Link></h3>
        <Link to=""><i className="fa fa-pencil" /></Link>
        <DexIndicatorComponent dex={dex} />
      </div>
      <div className="percentage">
        <ProgressComponent caught={dex.caught} total={dex.total} />
      </div>
    </div>
  );
}

function mapStateToProps ({ currentUser }) {
  return { username: currentUser };
}

export const DexPreviewComponent = connect(mapStateToProps)(DexPreview);
