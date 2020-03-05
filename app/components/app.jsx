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
        <Route path='/' exact component={HomeComponent} />
        <Route path='/login' exact component={LoginComponent} />
        <Route path='/register' exact component={RegisterComponent} />
        <Route path='/account' exact component={AccountComponent} />
        <Route path='/u/:username' exact component={ProfileComponent} />
        <Route path='/u/:username/:slug' exact component={TrackerComponent} />
        <Route path='/' component={NotFoundComponent} />
      </Switch>
    </Router>
  );
}
