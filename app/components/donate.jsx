import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { AlertComponent }  from './alert';
import { FooterComponent } from './footer';
import { NavComponent }    from './nav';
import { ReactGA }         from '../utils/analytics';
import { ReloadComponent } from './reload';
import { checkVersion }    from '../actions/utils';

export class Donate extends Component {

  constructor (props) {
    super(props);
    this.state = {
      error: null,
      amount: '1'
    };
  }

  componentWillMount () {
    const { checkVersion } = this.props;

    checkVersion();
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  donate = (e) => {
    e.preventDefault();

    this.setState({ ...this.state, error: null });

    // login({ username, password })
    // .then(() => ReactGA.event({ action: 'login', category: 'Session' }))
    // .catch((err) => {
    //   this.setState({ ...this.state, error: err.message });
    //   this.scrollToTop();
    // });
  }

  render () {
    const { session } = this.props;
    const { error, amount } = this.state;

    let sessionWarning = null;
    let otherAmount = null;

    if (!session) {
      sessionWarning = (
        <p>
          <Link className="link" to="/login">Login</Link> in first so we can attribute your donation to your account.
        </p>
      );
    }

    if (amount === 'other') {
      otherAmount = (
        <p>Note about signing in.</p>
      );
    }

    return (
      <DocumentTitle title="Donate | Pokédex Tracker">
        <div className="donate-container">
          <NavComponent />
          <ReloadComponent />
          <div className="form" ref={(c) => this._form = c}>
            <h1>Help us out!</h1>
            <form onSubmit={this.donate}>
              <div className="form-intro">
                <p>This project is completely open source, so every contribution, no matter how little, is greatly appreciated. Your donation will go towards server and development costs for the site. To show our gratitude, we'll add a special flair to your profile page!</p>
                {sessionWarning}
              </div>
              <div className="form-column">
                <AlertComponent message={error} type="error" />
              </div>
              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" id="name" type="text" placeholder="Ash Ketchum" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input className="form-control" name="email" id="email" type="email" required placeholder="ash.ketchum@gmail.com" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Drop us a Note?</label>
                    <textarea className="form-control" name="message" id="message" type="text" placeholder="We'd love to hear from you!" maxLength="500" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="ccname">Credit Card Number</label>
                    <input className="form-control" name="ccname" id="ccname" type="text" required placeholder="1234123412341234" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                    <i className="fa fa-asterisk" />
                  </div>
                  <div className="form-group form-group-flex">
                    <div>
                      <label htmlFor="ccexpmonth">Exp Month</label>
                      <select className="form-control">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      <i className="fa fa-chevron-down" />
                    </div>
                    <div>
                      <label htmlFor="ccexpyear">Exp Year</label>
                      <select className="form-control">
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                      <i className="fa fa-chevron-down" />
                    </div>
                  </div>
                  <div className="form-group form-group-flex">
                    <div>
                      <label htmlFor="cvc">CVC</label>
                      <input className="form-control" name="cvc" id="cvc" type="text" required placeholder="327" maxLength="20" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                      <i className="fa fa-asterisk" />
                    </div>
                    <div>
                      <label htmlFor="cczip">Billing ZIP</label>
                      <input className="form-control" name="cczip" id="cczip" type="text" required placeholder="94107" maxLength="20" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                      <i className="fa fa-asterisk" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Donation Amount</label>
                    <div className="radio">
                      <label>
                        <input type="radio" name="amount" checked={amount === '1'} value="1" onChange={() => this.setState({ amount: '1' })} />
                        <span className="radio-custom"><span /></span>$1
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="amount" checked={amount === '5'} value="5" onChange={() => this.setState({ amount: '5' })} />
                        <span className="radio-custom"><span /></span>$5
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="amount" checked={amount === '10'} value="10" onChange={() => this.setState({ amount: '10' })} />
                        <span className="radio-custom"><span /></span>$10
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="amount" checked={amount === 'other'} value="other" onChange={() => this.setState({ amount: 'other' })} />
                        <span className="radio-custom"><span /></span>Other
                      </label>
                    </div>
                    {otherAmount}
                  </div>
                </div>
              </div>
              <div className="form-column">
                <button className="btn btn-blue" type="submit">Donate <i className="fa fa-long-arrow-right" /></button>
                <p><i className="fa fa-lock" /> Secure payment transfer powered by <a className="link" href="/register" target="_blank" rel="noopener noreferrer">Stripe</a>.</p>
              </div>
            </form>
          </div>
          <FooterComponent />
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion())
  };
}

export const DonateComponent = connect(mapStateToProps, mapDispatchToProps)(Donate);
