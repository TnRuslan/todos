import * as React from 'react';

import '@blueprintjs/core/lib/css/blueprint.css';
import './shared/styles/global-styles.css';
import { PortalProvider } from '@blueprintjs/core';
import App from '~modules/app/app.module';
import { SnackbarProvider } from 'notistack';
import * as ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PortalProvider portalClassName="my-custom-class">
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <App />
    </SnackbarProvider>
  </PortalProvider>,
);
