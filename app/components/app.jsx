import { Route, Router, Switch }    from 'react-router-dom';
import { createBrowserHistory }     from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect }                from 'react';

import { AccountComponent }  from './account';
import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { NotFoundComponent } from './not-found';
import { ProfileComponent }  from './profile';
import { RegisterComponent } from './register';
import { TrackerComponent }  from './tracker';
import { logPageView }       from '../utils/analytics';
import { retrieveUser }      from '../actions/user';
import { setSessionUser }    from '../actions/session';

const history = createBrowserHistory();
history.listen(() => logPageView());
logPageView();

export function AppComponent () {
  const dispatch = useDispatch();

  const session = useSelector(({ session }) => session);

  useEffect(() => {
    (async () => {
      if (session) {
        const user = await dispatch(retrieveUser(session.username));
        dispatch(setSessionUser(user));
      }
    })();
  }, [session]);

  return (
    <Router history={history}>
      <Switch>
        <Route component={HomeComponent} exact path="/" />
        <Route component={LoginComponent} exact path="/login" />
        <Route component={RegisterComponent} exact path="/register" />
        <Route component={AccountComponent} exact path="/account" />
        <Route component={ProfileComponent} exact path="/u/:username" />
        <Route component={TrackerComponent} exact path="/u/:username/:slug" />
        <Route component={NotFoundComponent} path="/" />
      </Switch>
    </Router>
  );
}
