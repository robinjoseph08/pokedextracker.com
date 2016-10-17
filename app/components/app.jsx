import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore }          from 'react-router-redux';

import { AccountComponent }  from './account';
import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { NotFoundComponent } from './not-found';
import { RegisterComponent } from './register';
import { Store }             from '../stores';
import { TrackerComponent }  from './tracker';

const history = syncHistoryWithStore(browserHistory, Store);

export function AppComponent () {
  return (
    <Router history={history}>
      <Route path='/' component={HomeComponent}></Route>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/register' component={RegisterComponent}></Route>
      <Route path='/account' component={AccountComponent}></Route>
      <Route path='/u/:username' component={TrackerComponent}></Route>
      <Route path='*' component={NotFoundComponent}></Route>
    </Router>
  );
}
