import { Component }                 from 'react';
import { Link }                      from 'react-router';
import { connect }                   from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { AlertComponent }  from './alert';
import { ReactGA }         from '../utils/analytics';
import { checkVersion }    from '../actions/utils';
import { dollar, padding } from '../utils/formatting';
import { donate }          from '../actions/donation';

export class DonateForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      amount: '1',
      error: null,
      loading: false,
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

    const { donate, stripe } = this.props;
    const { amount } = this.state;
    const name = this._name.value || undefined;
    const email = this._email.value;
    const message = this._message.value || undefined;
    const otherAmount = amount === 'other' && this._otherAmount.value;

    this.setState({ error: null, loading: true });

    stripe.createToken({ name })
    .then(({ error, token }) => {
      if (error) {
        throw error;
      }

      return donate({
        name,
        email,
        token: token.id,
        message,
        amount: amount === 'other' ? parseFloat(otherAmount.replace(/[^\d\.]/g, '')) : amount
      });
    })
    .then(() => {
      ReactGA.event({ action: 'donate', category: 'Donation' });

      this.setState({ loading: false });
    })
    .catch((err) => {
      this.setState({ error: err.message, loading: false });
      this.scrollToTop();
    });
  }

  render () {
    const { session } = this.props;
    const { amount, error, loading } = this.state;

    const stripeStyles = {
      base: {
        fontFamily: '"Alegreya Sans", "Helvetica", sans-serif',
        fontSmoothing: 'antialiased',
        color: '#000000',
        fontSize: '15px'
      },
      invalid: {
        color: '#ff0000'
      }
    };

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
        <input className="form-control" ref={(c) => this._otherAmount = c} name="amount" id="amount" type="text" placeholder="$34.20" maxLength="20" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onBlur={(e) => this._otherAmount.value = dollar(e.target.value)} />
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
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" ref={(c) => this._name = c} name="name" id="name" type="text" placeholder="Ash Ketchum" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input className="form-control" ref={(c) => this._email = c} name="email" id="email" type="email" required placeholder="ash.ketchum@gmail.com" maxLength="100" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            <i className="fa fa-asterisk" />
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
          <div className="form-group">
            <label htmlFor="ccname">Credit Card</label>
            <CardElement className="form-control" style={stripeStyles} />
            <i className="fa fa-asterisk" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Drop us a Note?</label>
            <textarea className="form-control" ref={(c) => this._message = c} name="message" id="message" type="text" placeholder="We'd love to hear from you!" maxLength="500" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          </div>
          <button className="btn btn-blue" type="submit" disabled={loading}>
            <span className={loading ? 'hidden' : ''}>Donate <i className="fa fa-long-arrow-right" /></span>
            {loading ? <span className="spinner"><i className="fa fa-spinner fa-spin" /></span> : null}
          </button>
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
    checkVersion: () => dispatch(checkVersion()),
    donate: (payload) => dispatch(donate(payload))
  };
}

export const DonateFormComponent = injectStripe(connect(mapStateToProps, mapDispatchToProps)(DonateForm));
