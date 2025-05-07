import React from 'react';
import { notFoundStyles } from './notFoundPage.styles';

const NotFoundPage = (): React.ReactNode => {
	return (
		<div className={notFoundStyles}>
			<h2>Not Found</h2>
		</div>
	);
};

export default NotFoundPage;
