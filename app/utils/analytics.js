import Raven   from 'raven-js';
import ReactGA from 'react-ga';

import { Config }  from '../../config';
import { version } from '../../package.json';

ReactGA.initialize(Config.GA_ID, { titleCase: false });

Raven.config(Config.SENTRY_DSN, {
  environment: Config.ENVIRONMENT,
  release: version,
  shouldSendCallback: () => Config.ENVIRONMENT !== 'development'
}).install();

export { Raven, ReactGA };

export function logPageView () {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function logError (err) {
  Raven.captureException(err);
}

window.onunhandledrejection = (evt) => logError(evt.reason);
