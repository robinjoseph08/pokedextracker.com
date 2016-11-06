import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore }          from 'react-router-redux';

import { AccountComponent }  from './account';
import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { NotFoundComponent } from './not-found';
import { ProfileComponent }  from './profile';
import { RegisterComponent } from './register';
import { Store }             from '../stores';
import { TrackerComponent }  from './tracker';
import { logPageView }       from '../utils/analytics';

const history = syncHistoryWithStore(browserHistory, Store);

export function AppComponent () {
  return (
    <Router history={history} onUpdate={logPageView}>
      <Route path='/' component={HomeComponent} />
      <Route path='/login' component={LoginComponent} />
      <Route path='/register' component={RegisterComponent} />
      <Route path='/account' component={AccountComponent} />
      <Route path='/u/:username' component={ProfileComponent} />
      <Route path='/u/:username/:slug' component={TrackerComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Router>
  );
}
