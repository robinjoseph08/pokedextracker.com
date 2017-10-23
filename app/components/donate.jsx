import DocumentTitle from 'react-document-title';
import { Elements }  from 'react-stripe-elements';

import { DonateFormComponent } from './donate-form';
import { FooterComponent } from './footer';
import { NavComponent }    from './nav';
import { ReloadComponent } from './reload';

export function DonateComponent () {
  return (
    <DocumentTitle title="Donate | Pokédex Tracker">
      <div className="donate-container">
        <NavComponent />
        <ReloadComponent />
        <div className="form">
          <h1>Help us out!</h1>
          <Elements fonts={[{ cssSrc: 'https://fonts.googleapis.com/css?family=Alegreya+Sans:400,400italic' }]}>
            <DonateFormComponent />
          </Elements>
        </div>
        <FooterComponent />
      </div>
    </DocumentTitle>
  );
}
