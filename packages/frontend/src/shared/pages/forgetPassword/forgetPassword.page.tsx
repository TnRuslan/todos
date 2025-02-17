import { Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { ROUTER_KEYS } from '~shared/keys';
import { forgetPasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';
import { formWrapper } from './forgetPassword.styles';
import Form from '~shared/components/form/form.component';
import { linkStyles } from '~shared/styles/common-styles';

interface IFormData {
	email: string;
}

const ForgetPasswordPage = (): React.ReactNode => {
	const { forgetPassword } = useAuthStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(forgetPasswordSchema) });

	const onSubmit = (data: IFormData): void => {
		forgetPassword(data);
		reset();
	};

	return (
		<div>
			<Form<IFormData>
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				title="Reset your password"
			>
				<Input
					type="email"
					label="Email"
					{...register('email')}
					errorMessage={errors?.email?.message}
				/>
				<Card className={formWrapper}>
					<Link to={ROUTER_KEYS.LOGIN} className={linkStyles}>
						Sign in
					</Link>
					<Link to={ROUTER_KEYS.REGISTER} className={linkStyles}>
						Sign up
					</Link>
				</Card>
			</Form>
		</div>
	);
};

export default ForgetPasswordPage;
