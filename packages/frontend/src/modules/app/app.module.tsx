import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '~router/router';

import DashboardLayout from '~shared/layout/dashboard/dashboard.layout';

const App = (): React.ReactNode => {
	return (
		<BrowserRouter>
			<DashboardLayout>
				<Router />
			</DashboardLayout>
		</BrowserRouter>
	);
};

export default App;
