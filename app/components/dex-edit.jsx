import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import slug          from 'slug';

import { AlertComponent }       from './alert';
import { FormWarningComponent } from './form-warning';
import { ReactGA }              from '../utils/analytics';
import { deleteDex, updateDex } from '../actions/dex';

const URL_WARNING = 'The old URL to your dex will not function anymore.';
const REGION_WARNING = 'Any capture information not in the Alolan Dex will be lost.';
const GENERATION_WARNING = 'Any Gen 7 capture information will be lost.';

export class DexEdit extends Component {

  constructor (props) {
    super(props);
    this.state = {
      error: null,
      gen: props.dex.generation,
      loading: false,
      url: props.dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    };
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
      gen: dex.generation,
      loading: false,
      url: dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    });
    onRequestClose(shouldReload);
  }

  deleteDex = () => {
    const { deleteDex, dex, session } = this.props;

    deleteDex(dex.slug, session.username)
    .then(() => {
      ReactGA.event({ action: 'delete', category: 'Dex' });
      this.onRequestClose(true);
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.message });
      this.scrollToTop();
    });
  }

  updateDex = (e) => {
    e.preventDefault();
    const { dex, session, updateDex } = this.props;
    const { confirmingEdit, gen, url } = this.state;

    if (!confirmingEdit && (slug(url || 'Living Dex', { lower: true }) !== dex.slug || gen !== dex.generation)) {
      return this.setState({ ...this.state, confirmingEdit: true });
    }

    const title = this._title.value;
    const shiny = this._shiny.checked;
    const generation = this._generation.value;
    const region = parseInt(generation) === 7 ? 'alola' : 'national';
    const payload = {
      slug: dex.slug,
      username: session.username,
      payload: { title, shiny, generation, region }
    };

    updateDex(payload)
    .then(() => {
      ReactGA.event({ action: 'update', category: 'Dex' });
      this.onRequestClose(true);
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.message });
      this.scrollToTop();
    });
  }

  render () {
    const { dex, isOpen, session } = this.props;
    const { confirmingDelete, confirmingEdit, error, gen, url } = this.state;

    let dexDelete = null;

    if (!confirmingDelete) {
      dexDelete = <a className="link" onClick={() => this.setState({ ...this.state, confirmingDelete: true })}><i className="fa fa-trash" /></a>;
    } else {
      dexDelete = <div>Are you sure? <a className="link" onClick={this.deleteDex}>Yes</a> <a className="link" onClick={() => this.setState({ ...this.state, confirmingDelete: false })}>No</a></div>;
    }

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={() => this.onRequestClose()}>
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
              <FormWarningComponent message={slug(url || 'Living Dex', { lower: true }) !== dex.slug ? URL_WARNING : null} />
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" defaultValue={dex.title} onChange={() => this.setState({ ...this.state, url: this._title.value })} />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
              <FormWarningComponent message={gen < dex.generation ? GENERATION_WARNING : (gen > dex.generation ? REGION_WARNING : null)} />
              <label htmlFor="generation">Generation</label>
              <select className="form-control" ref={(c) => this._generation = c} defaultValue={dex.generation} onChange={() => this.setState({ ...this.state, gen: parseInt(this._generation.value) })}>
                <option value="7">Seven</option>
                <option value="6">Six</option>
              </select>
              <i className="fa fa-chevron-down" />
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

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteDex: (slug, username) => dispatch(deleteDex(slug, username)),
    updateDex: (payload) => dispatch(updateDex(payload))
  };
}

export const DexEditComponent = connect(mapStateToProps, mapDispatchToProps)(DexEdit);
