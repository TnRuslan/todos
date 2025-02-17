import { Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { LoginData } from '~shared/interfaces/user.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { loginSchema } from '~shared/schemas/auth.schema';
import { useAuthStore } from '~store/auth.store';
import { formWrapper } from './auth.styles';
import Form from '~shared/components/form/form.component';
import { linkStyles } from '~shared/styles/common-styles';

const LoginPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const { login } = useAuthStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<LoginData>>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data: LoginData): void => {
		login(data);
		reset();
		navigate(ROUTER_KEYS.DASHBOARD);
	};

	return (
		<div>
			<Form<LoginData>
				title="Login"
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				submitBtnTitle="Login"
			>
				<Input
					type="email"
					label="Email"
					{...register('email')}
					errorMessage={errors?.email?.message}
				/>
				<Input
					label="Password"
					{...register('password')}
					type="password"
					errorMessage={errors?.password?.message}
				/>
				<Card className={formWrapper}>
					<Link to={ROUTER_KEYS.REGISTER} className={linkStyles}>
						Sign up
					</Link>
					<Link
						to={ROUTER_KEYS.FORGET_PASSWORD}
						className={linkStyles}
					>
						Forget Password
					</Link>
				</Card>
			</Form>
		</div>
	);
};

export default LoginPage;
