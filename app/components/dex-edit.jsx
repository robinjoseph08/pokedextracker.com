import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import slug          from 'slug';

import { AlertComponent }       from './alert';
import { FormWarningComponent } from './form-warning';
import { ReactGA }              from '../utils/analytics';
import { deleteDex, updateDex } from '../actions/dex';

const GAME_WARNING = 'Any capture info specific to your old game will be lost.';
const REGIONAL_WARNING = 'Any non-regional capture info will be lost.';
const URL_WARNING = 'The old URL to your dex will not function anymore.';

export class DexEdit extends Component {

  constructor (props) {
    super(props);
    this.state = {
      error: null,
      game: props.dex.game.id,
      loading: false,
      regional: props.dex.regional,
      url: props.dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    };
  }

  onChange = (e) => {
    const { gamesById } = this.props;
    const game = e.target.value;

    if (!gamesById[game].game_family.regional_support) {
      this.setState({ regional: false });
    }

    if (!gamesById[game].game_family.national_support) {
      this.setState({ regional: true });
    }

    this.setState({ game });
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  onRequestClose = (shouldReload) => {
    const { dex, onRequestClose } = this.props;

    this.setState({
      error: null,
      game: dex.game.id,
      loading: false,
      regional: dex.regional,
      url: dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    });
    onRequestClose(shouldReload);
  }

  get showGameWarning () {
    const { dex, gamesById } = this.props;
    const { game } = this.state;

    const differentFamily = gamesById[game].game_family.id !== dex.game.game_family.id;
    const lessNationalCount = gamesById[game].game_family.national_total < dex.game.game_family.national_total;

    return differentFamily && lessNationalCount;
  }

  get showRegionalWarning () {
    const { dex } = this.props;
    const { regional } = this.state;

    return regional && !dex.regional;
  }

  get showURLWarning () {
    const { dex } = this.props;
    const { url } = this.state;

    return slug(url || 'Living Dex', { lower: true }) !== dex.slug;
  }

  deleteDex = () => {
    const { deleteDex, dex, session } = this.props;

    deleteDex(dex.slug, session.username)
    .then(() => {
      ReactGA.event({ action: 'delete', category: 'Dex' });
      this.onRequestClose(true);
    })
    .catch((err) => {
      this.setState({ error: err.message });
      this.scrollToTop();
    });
  }

  updateDex = (e) => {
    e.preventDefault();
    const { dex, session, updateDex } = this.props;
    const { confirmingEdit, game, regional } = this.state;

    if (!confirmingEdit && (this.showGameWarning || this.showRegionalWarning || this.showURLWarning)) {
      return this.setState({ confirmingEdit: true });
    }

    const title = this._title.value;
    const shiny = this._shiny.checked;
    const payload = {
      slug: dex.slug,
      username: session.username,
      payload: { title, shiny, game, regional }
    };

    updateDex(payload)
    .then(() => {
      ReactGA.event({ action: 'update', category: 'Dex' });
      this.onRequestClose(true);
    })
    .catch((err) => {
      this.setState({ error: err.message });
      this.scrollToTop();
    });
  }

  render () {
    const { dex, games, gamesById, isOpen, session } = this.props;
    const { confirmingDelete, confirmingEdit, error, game, regional, url } = this.state;

    let dexDelete = null;

    if (!confirmingDelete) {
      dexDelete = <a className="link" onClick={() => this.setState({ confirmingDelete: true })}><i className="fa fa-trash" /></a>;
    } else {
      dexDelete = <div>Are you sure? <a className="link" onClick={this.deleteDex}>Yes</a> <a className="link" onClick={() => this.setState({ confirmingDelete: false })}>No</a></div>;
    }

    if (!isOpen || !games) {
      return null;
    }

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={() => this.onRequestClose()} contentLabel="Edit Dex">
        <div className="dex-delete-container">
          {dexDelete}
        </div>
        <div className="form" ref={(c) => this._form = c}>
          <h1>Edit a Dex</h1>
          <form onSubmit={this.updateDex} className="form-column">
            <AlertComponent message={error} type="error" />
            <div className="form-group">
              <div className="form-note">/u/{session.username}/{slug(url || 'Living Dex', { lower: true })}</div>
              <label htmlFor="dex_title">Title</label>
              <FormWarningComponent message={this.showURLWarning ? URL_WARNING : null} />
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" defaultValue={dex.title} onChange={() => this.setState({ url: this._title.value })} />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
              <FormWarningComponent message={this.showGameWarning ? GAME_WARNING : null} />
              <label htmlFor="game">Game</label>
              <select className="form-control" onChange={this.onChange} value={game}>
                {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
              </select>
              <i className="fa fa-chevron-down" />
            </div>
            <div className="form-group">
              <FormWarningComponent message={this.showRegionalWarning ? REGIONAL_WARNING : null} />
              <label htmlFor="regional">Regionality</label>
              <div className={`radio ${gamesById[game].game_family.national_support ? '' : 'disabled'}`}>
                <label title={gamesById[game].game_family.national_support ? '' : 'National dex is not supported for this game at this time.'}>
                  <input type="radio" name="regional" checked={!regional} disabled={!gamesById[game].game_family.national_support} value="national" onChange={() => this.setState({ regional: false })} />
                  <span className="radio-custom"><span /></span>National
                </label>
              </div>
              <div className={`radio ${gamesById[game].game_family.regional_support ? '' : 'disabled'}`}>
                <label title={gamesById[game].game_family.regional_support ? '' : 'Regional dex is not supported for this game at this time.'}>
                  <input type="radio" name="regional" checked={regional} disabled={!gamesById[game].game_family.regional_support} value="regional" onChange={() => this.setState({ regional: true })} />
                  <span className="radio-custom"><span /></span>Regional
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <div className="radio">
                <label>
                  <input type="radio" name="type" defaultChecked={!dex.shiny} />
                  <span className="radio-custom"><span /></span>Normal
                </label>
              </div>
              <div className="radio">
                <label>
                  <input ref={(c) => this._shiny = c} type="radio" name="type" defaultChecked={dex.shiny} />
                  <span className="radio-custom"><span /></span>Shiny
                </label>
              </div>
            </div>
            <AlertComponent className="form-confirm" message={confirmingEdit ? 'Please review the warnings above and confirm your edit!' : null} type="error" />
            <button className="btn btn-blue form-confirm" type="submit">{confirmingEdit ? 'Confirm' : ''} Edit <i className="fa fa-long-arrow-right" /></button>
          </form>
        </div>
        <p><a className="link" onClick={() => this.onRequestClose()}>Go Back</a></p>
      </Modal>
    );
  }

}

function mapStateToProps ({ games, gamesById, session }) {
  return { games, gamesById, session };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteDex: (slug, username) => dispatch(deleteDex(slug, username)),
    updateDex: (payload) => dispatch(updateDex(payload))
  };
}

export const DexEditComponent = connect(mapStateToProps, mapDispatchToProps)(DexEdit);
