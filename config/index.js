import { Development } from './development';
import { Production }  from './production';
import { Staging }     from './staging';

const config = {
  development: Development,
  production: Production,
  staging: Staging
};

export const Config = config[process.env.NODE_ENV];
