import * as Sentry from '@sentry/browser';

import { Config } from '../../config';

Sentry.init({
  dsn: Config.SENTRY_DSN,
  enabled: Config.ENVIRONMENT !== 'development',
  environment: Config.ENVIRONMENT,
  release: Config.VERSION
});

export { Sentry };
