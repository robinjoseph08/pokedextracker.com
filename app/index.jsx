import './styles';

import Modal        from 'react-modal';
import { Provider } from 'react-redux';
import { render }   from 'react-dom';

import { AppComponent } from './components/app';
import { Store }        from './stores';

Modal.setAppElement('#root');

function run () {
  render(
    <Provider store={Store}>
      <AppComponent />
    </Provider>,
    document.getElementById('root')
  );
}

if (document.getElementById('root')) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run);
}
