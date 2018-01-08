import { Development } from './development';
import { Local }       from './local';
import { Production }  from './production';
import { Staging }     from './staging';

const CONFIG = {
  development: Development,
  local: Local,
  production: Production,
  staging: Staging
};

const ENVIRONMENTS = {
  'pokedextracker.com': 'production',
  'staging.pokedextracker.com': 'staging'
};

const environment = process.env.NODE_ENV || ENVIRONMENTS[window.location.hostname] || 'development';

export const Config = CONFIG[environment];
