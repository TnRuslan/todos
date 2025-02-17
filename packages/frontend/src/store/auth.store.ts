import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ERROR_MESSAGES } from '~shared/constants/errorMessages';
import {
	ChangePasswordData,
	IRegisterData,
	IUser,
	LoginData,
	ForgetPassword,
	ResetPassword,
} from '~shared/interfaces/user.interface';
import { STORAGE_KEYS } from '~shared/keys';
import AuthService from '~shared/services/auth.service';

interface IAuthStore {
	user: IUser | null;
	token: string | null;
	loading: boolean;
	error: AxiosError | null;
	register: (data: IRegisterData) => Promise<void>;
	login: (data: LoginData) => Promise<void>;
	logOut: () => void;
	verifyEmail: (verifyToken: string) => Promise<void>;
	getCurrentUser: () => Promise<void>;
	changePassword: (passwords: ChangePasswordData) => Promise<void>;
	forgetPassword: (forgetPassword: ForgetPassword) => Promise<void>;
	resetPassword: (
		resetToken: string,
		newPassword: ResetPassword,
	) => Promise<void>;
}

const authService = new AuthService();

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			error: null,
			token: null,

			register: async (registerData: IRegisterData): Promise<void> => {
				set({
					loading: true,
				});

				try {
					const data = await authService.register(registerData);

					set({
						user: data.data,
						error: null,
						loading: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			login: async (loginData: LoginData): Promise<void> => {
				set({ loading: true });

				try {
					const { data, token } = await authService.login(loginData);

					set({
						user: data,
						token: token,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});
					set({
						loading: false,
					});
				}
			},

			logOut: (): void => {
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({
					user: null,
					token: null,
				});
			},

			verifyEmail: async (verificationToken: string): Promise<void> => {
				set({ loading: true });

				try {
					const data =
						await authService.verifyEmail(verificationToken);

					set({
						user: data.data,
						loading: false,
						error: null,
					});

					enqueueSnackbar('Email Verified', {
						variant: 'success',
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});

					set({
						error: error.message,
						loading: false,
					});
				}
			},

			getCurrentUser: async (): Promise<void> => {
				set({
					loading: true,
				});

				try {
					const data = await authService.getCurrentUser();

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			changePassword: async (
				passwords: ChangePasswordData,
			): Promise<void> => {
				set({ loading: true });

				try {
					await authService.changePassword(passwords);

					set({
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			forgetPassword: async (forgetPasswordData): Promise<void> => {
				set({ loading: true });

				try {
					await authService.forgetPassword(forgetPasswordData);

					set({
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			resetPassword: async (resetToken, newPassword): Promise<void> => {
				set({ loading: true });

				try {
					const data = await authService.resetPassword(
						resetToken,
						newPassword,
					);

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});

					set({
						loading: false,
						error: error.message,
					});
				}
			},
		}),
		{
			name: STORAGE_KEYS.TOKEN,
			partialize: (state) => ({ token: state.token, user: state.user }),
		},
	),
);
