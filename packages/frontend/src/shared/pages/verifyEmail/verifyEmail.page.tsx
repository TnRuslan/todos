import React, { useEffect } from 'react';
import { wrapperStyles } from './verifyEmail.styles';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '~store/auth.store';

const VerifyEmail = (): React.ReactNode => {
	const { id } = useParams();

	const { verifyEmail } = useAuthStore();

	useEffect(() => {
		verifyEmail(id);
	}, [id]);

	return (
		<div className={wrapperStyles}>
			<h2>Email Verified</h2>
		</div>
	);
};

export default VerifyEmail;
