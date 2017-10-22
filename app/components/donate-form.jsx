import { Component }    from 'react';
import { Link }         from 'react-router';
import { connect }      from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { AlertComponent }  from './alert';
import { checkVersion }    from '../actions/utils';
import { padding }         from '../utils/formatting';

export class DonateForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      amount: '1',
      error: null,
      months: Reflect.apply(Array, null, Array(12)).map((_, i) => padding(i + 1, 2)),
      years: Reflect.apply(Array, null, Array(10)).map((_, i) => new Date().getUTCFullYear() + i)
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

    // Stripe.createToken({

    // })
    // .then(() => ReactGA.event({ action: 'login', category: 'Session' }))
    // .catch((err) => {
    //   this.setState({ ...this.state, error: err.message });
    //   this.scrollToTop();
    // });
  }

  render () {
    const { session } = this.props;
    const { amount, error, months, years } = this.state;

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
              <CardElement className="form-control" />
              <input className="form-control" name="ccname" id="ccname" type="text" required placeholder="1234123412341234" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              <i className="fa fa-asterisk" />
            </div>
            <div className="form-group form-group-flex">
              <div>
                <label htmlFor="ccexpmonth">Exp Month</label>
                <select className="form-control">
                  {months.map((month) => <option key={month} value={month}>{month}</option>)}
                </select>
                <i className="fa fa-chevron-down" />
              </div>
              <div>
                <label htmlFor="ccexpyear">Exp Year</label>
                <select className="form-control">
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
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
          <p><i className="fa fa-lock" /> Secure payment transfer powered by <a className="link" href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a>.</p>
        </div>
      </form>
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

export const DonateFormComponent = injectStripe(connect(mapStateToProps, mapDispatchToProps)(DonateForm));
