import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';
import slug          from 'slug';

import { AlertComponent } from './alert';
import { ReactGA }        from '../utils/analytics';
import { editDex }        from '../actions/dex';

export class DexEdit extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null, confirmingDelete: false, confirmingEdit: false };
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  onRequestClose = () => {
    this.setState({ error: null, url: null, confirmingDelete: false, confirmingEdit: false });
    this.props.onRequestClose();
  }

  onSubmit = (e) => {

  }

  render () {
    const { isOpen, session } = this.props;
    const { confirmingDelete, confirmingEdit, error, url } = this.state;

    let dexDelete = null;
    let submit = null;

    if (!confirmingDelete) {
      dexDelete = (
        <div className="dex-delete-container">
          <a className="link" onClick={() => this.setState({ ...this.state, confirmingDelete: true })}><i className="fa fa-trash" /></a>
        </div>
      );
    } else {
      dexDelete = (
        <div className="dex-delete-container">
          <div>Are you sure? <a className="link">Yes</a> <a className="link" onClick={() => this.setState({ ...this.state, confirmingDelete: false })}>No</a></div>
        </div>
      );
    }

    if (!confirmingEdit) {
      submit = (
        <button className="btn btn-blue" onClick={() => this.setState({ ...this.state, confirmingEdit: true })}>Edit <i className="fa fa-long-arrow-right" /></button>
      );
    } else {
      submit = (
        <div className="form-confirm">
          <div className="alert alert-error">
            Please review the warnings above and confirm your edit!
          </div>
          <button className="btn btn-blue" type="submit">Confirm Edit <i className="fa fa-long-arrow-right" /></button>
        </div>
      );
    }

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={this.onRequestClose}>
        {dexDelete}
        <div className="form" ref={(c) => this._form = c}>
          <h1>Edit a Dex</h1>
          <form onSubmit={this.onSubmit} className="form-column">
            <AlertComponent message={error} type="error" />
            <div className="form-group">
              <div className="form-note">/u/{session.username}/{slug(url || 'Living Dex', { lower: true })}</div>
              <label htmlFor="dex_title">Title</label>
              <div className="form-warning">
                <div className="tooltip">
                  <i className="fa fa-exclamation-triangle" />
                  <span className="tooltip-text">The old URL to your dex will not function anymore.</span>
                </div>
              </div>
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" onChange={() => this.setState({ ...this.state, url: this._title.value })} />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
            <div className="form-warning">
              <div className="tooltip">
                <i className="fa fa-exclamation-triangle" />
                <span className="tooltip-text">Any Gen 7 capture information will be lost.</span>
              </div>
            </div>
              <label htmlFor="generation">Generation</label>
              <select className="form-control" ref={(c) => this._generation = c} defaultValue="6">
                <option value="6">Six</option>
              </select>
              <i className="fa fa-chevron-down" />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <div className="radio">
                <label>
                  <input type="radio" name="type" defaultChecked />
                  <span className="radio-custom"><span></span></span>Normal
                </label>
              </div>
              <div className="radio">
                <label>
                  <input ref={(c) => this._shiny = c} type="radio" name="type" />
                  <span className="radio-custom"><span></span></span>Shiny
                </label>
              </div>
            </div>
            {submit}
          </form>
        </div>
        <p><a className="link" onClick={this.onRequestClose}>Go Back</a></p>
      </Modal>
    );
  }

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    redirect: (path) => dispatch(push(path))
  };
}

export const DexEditComponent = connect(mapStateToProps, mapDispatchToProps)(DexEdit);
