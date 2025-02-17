import axios, { AxiosResponse } from 'axios';
import HttpServices from './http.service';
import {
	ChangePasswordData,
	ForgetPassword,
	IRegisterData,
	IUser,
	LoginData,
	LoginResponse,
	ResetPassword,
} from '~shared/interfaces/user.interface';
import { STORAGE_KEYS } from '~shared/keys';

class AuthService extends HttpServices {
	constructor() {
		super(process.env.SERVER_URL, axios, 'user');
	}

	async register(data: IRegisterData): Promise<AxiosResponse<IUser>> {
		return this.post({ url: 'register', data }, false);
	}

	async login(data: LoginData): Promise<LoginResponse> {
		const response = await this.post<AxiosResponse<LoginResponse>>(
			{ url: 'login', data },
			false,
		);

		localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

		return response.data;
	}

	async verifyEmail(verifyToken: string): Promise<AxiosResponse<IUser>> {
		return this.get({ url: `verify/${verifyToken}` });
	}

	async getCurrentUser(): Promise<AxiosResponse<IUser>> {
		return this.get({ url: 'current' }, true);
	}

	async changePassword(
		data: ChangePasswordData,
	): Promise<AxiosResponse<IUser>> {
		return this.patch({ url: 'change-password', data }, true);
	}

	async forgetPassword(email: ForgetPassword): Promise<AxiosResponse> {
		return this.post({ url: 'forget-password', data: email });
	}

	async resetPassword(
		resetToken: string,
		newPassword: ResetPassword,
	): Promise<AxiosResponse<IUser>> {
		return this.post({
			url: `reset-password/${resetToken}`,
			data: newPassword,
		});
	}
}

export default AuthService;
