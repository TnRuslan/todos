export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	REGISTER = '/register',
	DASHBOARD = '/',
	EDIT_TODO = '/edit/:id',
	USER_PROFILE = '/profile',
	VERIFY_EMAIL = '/verify/:id',
	RESET_PASSWORD = '/reset-password/:id',
	FORGET_PASSWORD = '/forget-password',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	TODO_STORE: 'TODO_STORE',
});

export const enum SEARCH_STRING_KEYS {
	SEARCH = 'search',
	IS_PUBLIC = 'isPublic',
	STATUS = 'status',
	PAGE = 'page',
	TAKE = 'take',
}
