import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';
import slug          from 'slug';

import { AlertComponent } from './alert';
import { ReactGA }        from '../utils/analytics';
import { createDex }      from '../actions/dex';

export class DexCreate extends Component {

  constructor (props) {
    super(props);
    const { games } = props;
    const latestGame = games[0];

    this.state = {
      error: null,
      url: null,
      game: latestGame.id,
      regional: !latestGame.game_family.national_support
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

  onRequestClose = () => {
    const { games } = this.props;
    const latestGame = games[0];

    this.setState({
      error: null,
      url: null,
      game: latestGame.id,
      regional: !latestGame.game_family.national_support
    });
    this.props.onRequestClose();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { createDex, redirect, session } = this.props;
    const { game, regional } = this.state;
    const title = this._title.value;
    const shiny = this._shiny.checked;
    const payload = {
      username: session.username,
      payload: { title, shiny, game, regional }
    };

    this.setState({ ...this.state, error: null });

    createDex(payload)
    .then((dex) => {
      ReactGA.event({ action: 'create', category: 'Dex' });

      redirect(`/u/${session.username}/${dex.slug}`);
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.message });
      this.scrollToTop();
    });
  }

  render () {
    const { games, gamesById, isOpen, session } = this.props;
    const { error, game, regional, url } = this.state;

    if (!isOpen || !games) {
      return null;
    }

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={this.onRequestClose} contentLabel="Create a New Dex">
        <div className="form" ref={(c) => this._form = c}>
          <h1>Create New Dex</h1>
          <form onSubmit={this.onSubmit} className="form-column">
            <AlertComponent message={error} type="error" />
            <div className="form-group">
              <div className="form-note">/u/{session.username}/{slug(url || 'Living Dex', { lower: true })}</div>
              <label htmlFor="dex_title">Title</label>
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" onChange={() => this.setState({ url: this._title.value })} />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
              <label htmlFor="game">Game</label>
              <select className="form-control" onChange={this.onChange} value={game}>
                {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
              </select>
              <i className="fa fa-chevron-down" />
            </div>
            <div className="form-group">
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
                  <input type="radio" name="type" defaultChecked />
                  <span className="radio-custom"><span /></span>Normal
                </label>
              </div>
              <div className="radio">
                <label>
                  <input ref={(c) => this._shiny = c} type="radio" name="type" />
                  <span className="radio-custom"><span /></span>Shiny
                </label>
              </div>
            </div>
            <button className="btn btn-blue" type="submit">Create <i className="fa fa-long-arrow-right" /></button>
          </form>
        </div>
        <p><a className="link" onClick={this.onRequestClose}>Go Back</a></p>
      </Modal>
    );
  }

}

function mapStateToProps ({ games, gamesById, session }) {
  return { games, gamesById, session };
}

function mapDispatchToProps (dispatch) {
  return {
    createDex: (payload) => dispatch(createDex(payload)),
    redirect: (path) => dispatch(push(path))
  };
}

export const DexCreateComponent = connect(mapStateToProps, mapDispatchToProps)(DexCreate);
