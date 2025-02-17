import { Card, Elevation } from '@blueprintjs/core';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { formStyles, FormWrapper } from './form.styles';
import { primaryBtn } from '~shared/styles/common-styles';

interface IForm<T> {
	title?: string;
	onSubmit: (data: T) => void;
	handleSubmit: UseFormHandleSubmit<T, undefined>;
	children?: React.ReactNode;
	submitBtnTitle?: string;
}

const Form = <T,>({
	title,
	onSubmit,
	handleSubmit,
	children,
	submitBtnTitle,
}: IForm<T>): React.ReactNode => {
	return (
		<Card elevation={Elevation.THREE} className={FormWrapper}>
			{title && <h2 style={{ marginBottom: '30px' }}>{title}</h2>}
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles}>
				{children}
				<button type="submit" className={primaryBtn}>
					{submitBtnTitle ?? 'Submit'}
				</button>
			</form>
		</Card>
	);
};

export default Form;
