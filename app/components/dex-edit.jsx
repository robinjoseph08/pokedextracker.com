import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import slug          from 'slug';

import { AlertComponent }       from './alert';
import { FormWarningComponent } from './form-warning';
import { ReactGA }              from '../utils/analytics';
import { deleteDex, updateDex } from '../actions/dex';

const GENERATION_WARNING = 'Any Gen 7 capture info will be lost.';
const REGION_WARNING = 'Any non-Alola Dex capture info will be lost.';
const URL_WARNING = 'The old URL to your dex will not function anymore.';

export class DexEdit extends Component {

  constructor (props) {
    super(props);
    this.state = {
      error: null,
      gen: props.dex.generation,
      loading: false,
      region: props.dex.region,
      url: props.dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    };
  }

  onChange = (e) => {
    const gen = parseInt(e.target.value);

    if (gen === 6) {
      this.setState({ region: 'national' });
    }

    this.setState({ gen });
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
      region: dex.region,
      url: dex.title,
      confirmingDelete: false,
      confirmingEdit: false
    });
    onRequestClose(shouldReload);
  }

  get showGenerationWarning () {
    const { dex } = this.props;
    const { gen } = this.state;

    return gen < dex.generation;
  }

  get showRegionWarning () {
    const { dex } = this.props;
    const { region } = this.state;

    return region === 'alola' && dex.region === 'national';
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
    const { confirmingEdit, gen, region } = this.state;

    if (!confirmingEdit && (this.showGenerationWarning || this.showRegionWarning || this.showURLWarning)) {
      return this.setState({ confirmingEdit: true });
    }

    const title = this._title.value;
    const shiny = this._shiny.checked;
    const generation = gen;
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
      this.setState({ error: err.message });
      this.scrollToTop();
    });
  }

  render () {
    const { dex, isOpen, session } = this.props;
    const { confirmingDelete, confirmingEdit, error, gen, region, url } = this.state;

    let dexDelete = null;

    if (!confirmingDelete) {
      dexDelete = <a className="link" onClick={() => this.setState({ confirmingDelete: true })}><i className="fa fa-trash" /></a>;
    } else {
      dexDelete = <div>Are you sure? <a className="link" onClick={this.deleteDex}>Yes</a> <a className="link" onClick={() => this.setState({ confirmingDelete: false })}>No</a></div>;
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
              <FormWarningComponent message={this.showGenerationWarning ? GENERATION_WARNING : null} />
              <label htmlFor="generation">Generation</label>
              <select className="form-control" onChange={this.onChange} value={gen}>
                <option value="7">Seven</option>
                <option value="6">Six</option>
              </select>
              <i className="fa fa-chevron-down" />
            </div>
            <div className="form-group">
              <FormWarningComponent message={this.showRegionWarning ? REGION_WARNING : null} />
              <label htmlFor="region">Regionality</label>
              <div className="radio">
                <label>
                  <input type="radio" name="region" checked={region === 'national'} value="national" onChange={() => this.setState({ region: 'national' })} />
                  <span className="radio-custom"><span /></span>National
                </label>
              </div>
              <div className={`radio ${gen === 6 ? 'disabled' : ''}`}>
                <label title={gen === 6 ? 'Regional dexes only supported for Gen 7.' : ''}>
                  <input type="radio" name="region" checked={region === 'alola'} disabled={gen === 6} value="alola" onChange={() => this.setState({ region: 'alola' })} />
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
