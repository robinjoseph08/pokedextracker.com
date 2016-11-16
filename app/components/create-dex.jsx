import { Component } from 'react';
import Modal         from 'react-modal';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';

import { AlertComponent } from './alert';
import { ReactGA }        from '../utils/analytics';
import { createDex }      from '../actions/dex';

export class CreateDex extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null };
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { createDex, redirect, session } = this.props;
    const title = this._title.value;
    const shiny = this._shiny.checked;
    const generation = this._generation.value;
    const payload = {
      username: session.username,
      payload: { title, shiny, generation }
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
    const { isOpen, onRequestClose } = this.props;
    const { error } = this.state;

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className="form" ref={(c) => this._form = c}>
          <h1>Create New Dex</h1>
          <form onSubmit={this.onSubmit}>
            <AlertComponent message={error} type="error" />
            <div className="form-group">
              <label htmlFor="dex_title">Title</label>
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" required placeholder="Living Dex" />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
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
            <button className="btn btn-blue" type="submit">Create <i className="fa fa-long-arrow-right" /></button>
          </form>
        </div>
      </Modal>
    );
  }

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    createDex: (payload) => dispatch(createDex(payload)),
    redirect: (path) => dispatch(push(path))
  };
}

export const CreateDexComponent = connect(mapStateToProps, mapDispatchToProps)(CreateDex);
