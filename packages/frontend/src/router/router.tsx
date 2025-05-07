import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import NotFoundPage from '~shared/pages/not-found/NotFoundPage';

const Router: React.FunctionComponent = () => {
	return (
		<Routes>
			{routes.map((rout) => (
				<Route key={rout.path} path={rout.path} element={rout.element} />
			))}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default Router;
