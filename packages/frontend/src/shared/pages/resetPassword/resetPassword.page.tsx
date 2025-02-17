import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '~shared/components/form/form.component';
import Input from '~shared/components/input/input.component';
import { ROUTER_KEYS } from '~shared/keys';
import { resetPasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';

interface IFormData {
	newPassword: string;
}

const ResetPasswordPage = (): React.ReactNode => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { resetPassword } = useAuthStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(resetPasswordSchema) });

	const onSubmit = (data: IFormData): void => {
		resetPassword(id, data);
		reset();
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<div>
			<Form<IFormData>
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				title="Create a new Password"
			>
				<Input
					type="password"
					label="New Password"
					{...register('newPassword')}
					errorMessage={errors?.newPassword?.message}
				/>
			</Form>
		</div>
	);
};

export default ResetPasswordPage;
