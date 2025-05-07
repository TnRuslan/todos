import { ROUTER_KEYS } from '~shared/keys';

export const menuConfig = [
	{
		title: 'Dashboard',
		path: ROUTER_KEYS.DASHBOARD,
	},
	{
		title: 'Profile',
		path: ROUTER_KEYS.USER_PROFILE,
	},
];

export const publicMenuConfig = [
	{
		title: 'Login',
		path: ROUTER_KEYS.LOGIN,
	},
	{
		title: 'Register',
		path: ROUTER_KEYS.REGISTER,
	},
];
