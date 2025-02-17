import { Response, Request } from 'express';
import { StatusCodes } from '@/utils/const/statusCode';
import { User } from '@prisma/client';
import { authMessages } from '@/utils/const/errorMessages';
import createToken from '@/helpers/create-token';
import AuthService from '@/services/auth.service';

export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response): Promise<void> {
		const newUser = await this.authService.register(req.body);

		res.status(StatusCodes.Created).json({ newUser });
	}

	async login(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		const token = createToken(user.id);

		res.status(StatusCodes.OK).json({
			data: this.authService.removePasswordFromData(user),
			token,
		});
	}

	async getCurrentUser(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		res.status(StatusCodes.OK).json({
			data: this.authService.removePasswordFromData(user),
		});
	}

	async verifyEmail(req: Request, res: Response): Promise<void> {
		const { token } = req.params;

		const verifiedUser = await this.authService.verifyEmail(token);

		res.status(StatusCodes.OK).json({
			data: verifiedUser,
			message: authMessages.emailVerified,
		});
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		await this.authService.changePassword(user, req.body);

		res.status(StatusCodes.OK).json({
			message: authMessages.passwordUpdated,
		});
	}

	async forgetPassword(req: Request, res: Response): Promise<void> {
		await this.authService.forgetPassword(req.body.email);

		res.status(StatusCodes.OK).json({
			message: authMessages.emailSent,
		});
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const resetId = req.params.id;

		const user = await this.authService.resetPassword(
			resetId,
			req.body.newPassword,
		);

		res.status(StatusCodes.OK).json({
			data: user,
		});
	}
}

const authController = new AuthController(new AuthService());

export default authController;
