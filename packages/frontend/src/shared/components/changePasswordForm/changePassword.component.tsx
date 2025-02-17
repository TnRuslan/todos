import React from 'react';
import Input from '~shared/components/input/input.component';
import { ChangePasswordData } from '~shared/interfaces/user.interface';
import Form from '~shared/components/form/form.component';
import { useAuthStore } from '~store/auth.store';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '~shared/schemas/user.schema';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangePasswordForm = ({
	handleClose,
}: {
	handleClose: () => void;
}): React.ReactNode => {
	const { changePassword } = useAuthStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<ChangePasswordData>>({
		resolver: yupResolver(changePasswordSchema),
	});

	const onSubmit = (data: ChangePasswordData): void => {
		changePassword(data);
		reset();
		handleClose();
	};

	return (
		<div>
			<Form<ChangePasswordData>
				title="Change Password"
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				submitBtnTitle="Change"
			>
				<Input
					type="password"
					label="Old Password"
					{...register('oldPassword')}
					errorMessage={errors?.oldPassword?.message}
				/>
				<Input
					label="New Password"
					{...register('newPassword')}
					type="password"
					errorMessage={errors?.newPassword?.message}
				/>
			</Form>
		</div>
	);
};

export default ChangePasswordForm;
