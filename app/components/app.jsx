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
        try  {
          const user = await dispatch(retrieveUser(session.username));
          dispatch(setSessionUser(user));
        } catch (err) {}
      }
    })();
  }, [session]);

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
