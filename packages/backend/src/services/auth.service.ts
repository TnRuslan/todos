import { PrismaClient, User } from '@prisma/client';

import { authMessages, errorMessages } from '@/utils/const/errorMessages';
import { StatusCodes } from '@/utils/const/statusCode';
import MailService from './mail.service';
import {
	ChangePasswordData,
	CreateUserType,
	UserWithoutPassword,
} from '@/types/user.type';
import { HttpError } from '@/helpers/httpError';

const prisma = new PrismaClient();

const mailService = new MailService();

export default class AuthService {
	removePasswordFromData(user: User): UserWithoutPassword {
		const { password: _, ...userDataWithoutPassword } = user;

		return userDataWithoutPassword;
	}

	async register(data: CreateUserType): Promise<UserWithoutPassword> {
		const user = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (user) {
			throw new HttpError(authMessages.exist, StatusCodes.BadRequest);
		}

		const newUser = await prisma.user.create({
			data: data,
		});

		const verificationCode = await prisma.verificationCode.create({
			data: {
				userId: newUser.id,
			},
		});

		await mailService.sendVerificationEmail(
			newUser.email,
			verificationCode.id,
		);

		return this.removePasswordFromData(newUser);
	}

	async verifyEmail(verificationCode: string): Promise<UserWithoutPassword> {
		const verification = await prisma.verificationCode.findUnique({
			where: {
				id: verificationCode,
			},
		});

		if (!verification) {
			throw new HttpError(
				errorMessages[StatusCodes.BadRequest],
				StatusCodes.BadRequest,
			);
		}

		await prisma.verificationCode.delete({
			where: { id: verificationCode },
		});

		const verifiedUser = await prisma.user.update({
			where: { id: verification.userId },
			data: { verify: true },
		});

		return this.removePasswordFromData(verifiedUser);
	}

	async changePassword(
		user: User,
		data: ChangePasswordData,
	): Promise<UserWithoutPassword> {
		if (user.password !== data.oldPassword) {
			throw new HttpError(
				authMessages.wrongPasswordOrEmail,
				StatusCodes.BadRequest,
			);
		}

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { password: data.newPassword },
		});

		return this.removePasswordFromData(updatedUser);
	}

	async forgetPassword(email: string): Promise<UserWithoutPassword> {
		const user = await prisma.user.findUnique({
			where: { email: email },
		});

		if (!user) {
			throw new HttpError(
				errorMessages[StatusCodes.NotFound],
				StatusCodes.NotFound,
			);
		}

		const passwordReset = await prisma.resetPassword.create({
			data: {
				userId: user.id,
			},
		});

		await mailService.sendForgotPasswordEmail(email, passwordReset.id);

		return this.removePasswordFromData(user);
	}

	async resetPassword(
		passwordResetId: string,
		newPassword: string,
	): Promise<UserWithoutPassword> {
		const passwordReset = await prisma.resetPassword.findUnique({
			where: { id: passwordResetId },
		});

		if (!passwordReset) {
			throw new HttpError(
				errorMessages[StatusCodes.NotFound],
				StatusCodes.NotFound,
			);
		}

		const updatedUser = await prisma.user.update({
			where: { id: passwordReset.userId },
			data: { password: newPassword },
		});

		await prisma.resetPassword.delete({ where: passwordReset });

		return this.removePasswordFromData(updatedUser);
	}
}
