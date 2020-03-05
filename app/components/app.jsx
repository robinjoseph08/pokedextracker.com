import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory }  from 'history';

import { AccountComponent }  from './account';
import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { NotFoundComponent } from './not-found';
import { ProfileComponent }  from './profile';
import { RegisterComponent } from './register';
import { TrackerComponent }  from './tracker';
import { logPageView }       from '../utils/analytics';

const history = createBrowserHistory();
history.listen(() => logPageView());
logPageView();

export function AppComponent () {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/login' component={LoginComponent} />
        <Route path='/register' component={RegisterComponent} />
        <Route path='/account' component={AccountComponent} />
        <Route path='/u/:username' component={ProfileComponent} />
        <Route path='/u/:username/:slug' component={TrackerComponent} />
        <Route path='/' component={NotFoundComponent} />
      </Switch>
    </Router>
  );
}
