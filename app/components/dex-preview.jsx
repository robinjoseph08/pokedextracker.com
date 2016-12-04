import { Component } from 'react';
import { Link }    from 'react-router';
import { connect } from 'react-redux';

import { DexEditComponent }      from './dex-edit';
import { DexIndicatorComponent } from './dex-indicator';
import { ProgressComponent }     from './progress';

export class DexPreview extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  render () {
    const { dex, session, user } = this.props;
    const { showEditDex } = this.state;

    const ownPage = session && session.id === user.id;
    let editDexButton = null;

    if (ownPage) {
      editDexButton = (
        <div className="dex-edit">
          <a className ="link" onClick={() => this.setState({ ...this.state, showEditDex: true })}><i className="fa fa-pencil" /></a>
          <DexEditComponent dex={dex} isOpen={showEditDex} onRequestClose={() => this.setState({ ...this.state, showEditDex: false })} />
        </div>
      );
    }

    return (
      <div className="dex-preview">
        <div className="dex-preview-header">
          <h3><Link to={`/u/${user.username}/${dex.slug}`} className="link">{dex.title}</Link></h3>
          {editDexButton}
          <DexIndicatorComponent dex={dex} />
        </div>
        <div className="percentage">
          <ProgressComponent caught={dex.caught} total={dex.total} />
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ currentUser, session, users }) {
  return { session, user: users[currentUser] };
}

export const DexPreviewComponent = connect(mapStateToProps)(DexPreview);
