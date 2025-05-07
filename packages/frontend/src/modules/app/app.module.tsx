import * as React from 'react';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '~router/router';

import DashboardLayout from '~shared/layout/dashboard/dashboard.layout';

type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>(null);

const App = (): React.ReactNode => {
	const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

	const toggleTheme = (): void => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<BrowserRouter>
				<DashboardLayout>
					<Router />
				</DashboardLayout>
			</BrowserRouter>
		</ThemeContext.Provider>
	);
};

export default App;
