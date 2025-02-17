import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import LoginPage from '~shared/pages/auth/login.page';
import RegisterPage from '~shared/pages/auth/register.page';
import DashboardPage from '~shared/pages/dashboard/dashboard.page';
import EditTodoPage from '~shared/pages/edit-todo/editTodo.page';
import ForgetPasswordPage from '~shared/pages/forgetPassword/forgetPassword.page';
import ResetPasswordPage from '~shared/pages/resetPassword/resetPassword.page';
import UserProfile from '~shared/pages/user/profile.page';
import VerifyEmail from '~shared/pages/verifyEmail/verifyEmail.page';
import { useAuthStore } from '~store/auth.store';

export const PublicRoute = ({
	redirectTo = ROUTER_KEYS.DASHBOARD,
	children,
}: {
	redirectTo?: string;
	children: React.ReactNode;
}): React.ReactNode => {
	const { token } = useAuthStore();
	return token ? <Navigate to={redirectTo} /> : children;
};

export const PrivateRoute = ({
	redirectTo = ROUTER_KEYS.LOGIN,
	children,
}: {
	redirectTo?: string;
	children: React.ReactNode;
}): React.ReactNode => {
	const { token } = useAuthStore();
	return token ? children : <Navigate to={redirectTo} />;
};

const publicRoutes = [
	{
		title: 'Login',
		path: ROUTER_KEYS.LOGIN,
		element: <LoginPage />,
	},
	{
		title: 'Register',
		path: ROUTER_KEYS.REGISTER,
		element: <RegisterPage />,
	},
	{
		title: 'Forget Password',
		path: ROUTER_KEYS.FORGET_PASSWORD,
		element: <ForgetPasswordPage />,
	},
	{
		title: 'Reset Password',
		path: ROUTER_KEYS.RESET_PASSWORD,
		element: <ResetPasswordPage />,
	},
	{
		title: 'Verify User Email',
		path: ROUTER_KEYS.VERIFY_EMAIL,
		element: <VerifyEmail />,
	},
];

export const privateRoutes = [
	{
		title: 'Home Page',
		path: ROUTER_KEYS.DASHBOARD,
		element: <DashboardPage />,
	},
	{
		title: 'Edit todo',
		path: ROUTER_KEYS.EDIT_TODO,
		element: <EditTodoPage />,
	},
	{
		title: 'User Profile',
		path: ROUTER_KEYS.USER_PROFILE,
		element: <UserProfile />,
	},
];

export const routes = [
	...publicRoutes.map((route) => ({
		...route,
		element: (
			<PublicRoute redirectTo={ROUTER_KEYS.DASHBOARD}>
				{route.element}
			</PublicRoute>
		),
	})),
	...privateRoutes.map((route) => ({
		...route,
		element: (
			<PrivateRoute redirectTo={ROUTER_KEYS.LOGIN}>
				{route.element}
			</PrivateRoute>
		),
	})),
];
