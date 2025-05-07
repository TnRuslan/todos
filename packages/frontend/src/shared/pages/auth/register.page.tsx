import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Form from '~shared/components/form/form.component';
import Input from '~shared/components/input/input.component';
import type { IRegisterData } from '~shared/interfaces/user.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { registerSchema } from '~shared/schemas/auth.schema';
import { linkStyles } from '~shared/styles/common-styles';
import { useAuthStore } from '~store/auth.store';

const RegisterPage = (): React.ReactNode => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Partial<IRegisterData>>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterData): void => {
    registerUser(data);
    reset();
    navigate(ROUTER_KEYS.LOGIN);
  };

  return (
    <div>
      <Form<IRegisterData>
        title="Register"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        submitBtnTitle="Sign up"
      >
        <Input
          label="Username"
          {...register('username', { required: true })}
          errorMessage={errors?.username?.message}
        />
        <Input
          type="email"
          label="Email"
          {...register('email', { required: true })}
          errorMessage={errors?.email?.message}
          autoComplete="email"
        />
        <Input
          label="Password"
          {...register('password', { required: true })}
          type="password"
          autoComplete="current-password"
          errorMessage={errors?.password?.message}
        />
        <Link to={ROUTER_KEYS.LOGIN} className={linkStyles}>
          Sign in
        </Link>
      </Form>
    </div>
  );
};

export default RegisterPage;
