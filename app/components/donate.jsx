import DocumentTitle from 'react-document-title';
import { Elements }  from 'react-stripe-elements';

import { DonateFormComponent } from './donate-form';
import { FooterComponent }     from './footer';
import { NavComponent }        from './nav';
import { ReloadComponent }     from './reload';

export function DonateComponent () {
  return (
    <DocumentTitle title="Donate | Pokédex Tracker">
      <div className="donate-container">
        <NavComponent />
        <ReloadComponent />
        <Elements fonts={[{ cssSrc: 'https://fonts.googleapis.com/css?family=Alegreya+Sans:400,400italic' }]}>
          <DonateFormComponent />
        </Elements>
        <FooterComponent />
      </div>
    </DocumentTitle>
  );
}
