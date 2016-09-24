import './styles';

import { Provider } from 'react-redux';
import { render }   from 'react-dom';

import { AppComponent } from './components/app';
import { Store }        from './stores';

render(
  <Provider store={Store}>
    <AppComponent></AppComponent>
  </Provider>,
  document.getElementById('root')
);
