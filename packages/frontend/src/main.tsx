import { PortalProvider } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '~modules/app/app.module';
import './shared/styles/global-styles.css';

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
