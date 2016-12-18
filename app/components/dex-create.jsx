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
    this.state = { error: null };
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  onRequestClose = () => {
    this.setState({ error: null, url: null });
    this.props.onRequestClose();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { createDex, redirect, session } = this.props;
    const title = this._title.value;
    const shiny = this._shiny.checked;
    const generation = this._generation.value;
    const region = parseInt(generation) === 7 ? 'alola' : 'national';
    const payload = {
      username: session.username,
      payload: { title, shiny, generation, region }
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
    const { isOpen, session } = this.props;
    const { error, url } = this.state;

    return (
      <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={this.onRequestClose}>
        <div className="form" ref={(c) => this._form = c}>
          <h1>Create New Dex</h1>
          <form onSubmit={this.onSubmit} className="form-column">
            <AlertComponent message={error} type="error" />
            <div className="form-group">
              <div className="form-note">/u/{session.username}/{slug(url || 'Living Dex', { lower: true })}</div>
              <label htmlFor="dex_title">Title</label>
              <input className="form-control" ref={(c) => this._title = c} name="dex_title" id="dex_title" type="text" maxLength="300" required placeholder="Living Dex" onChange={() => this.setState({ ...this.state, url: this._title.value })} />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group">
              <label htmlFor="generation">Generation</label>
              <select className="form-control" ref={(c) => this._generation = c} defaultValue="7">
                <option value="7">Seven</option>
                <option value="6">Six</option>
              </select>
              <i className="fa fa-chevron-down" />
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

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    createDex: (payload) => dispatch(createDex(payload)),
    redirect: (path) => dispatch(push(path))
  };
}

export const DexCreateComponent = connect(mapStateToProps, mapDispatchToProps)(DexCreate);
