import { Development } from './development';
import { Production }  from './production';
import { Staging }     from './staging';

export interface IConfig {
  API_HOST: string;
  ENABLE_PRODUCTION: boolean;
}

const config = {
  development: Development,
  production: Production,
  staging: Staging
};

/* istanbul ignore next */
export const Config: IConfig = config[process.env.NODE_ENV];
