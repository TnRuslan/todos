import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PortalProvider } from '@blueprintjs/core';
import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { SnackbarProvider } from 'notistack';
import App from '~modules/app/app.module';

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
