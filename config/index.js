import { Development } from './development';
import { Local }       from './local';
import { Production }  from './production';
import { Staging }     from './staging';

const config = {
  development: Development,
  local: Local,
  production: Production,
  staging: Staging
};

export const Config = config[process.env.NODE_ENV];
