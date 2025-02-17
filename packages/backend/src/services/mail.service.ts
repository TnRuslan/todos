import forgotPasswordEmail from '@/email/forgotPassword.email';
import verificationEmail from '@/email/verification.email';
import * as postmark from 'postmark';
import 'dotenv/config';

const { FRONTEND_URL, SENDER_EMAIL, POSTMARK_API_KEY } = process.env;
const client = new postmark.ServerClient(POSTMARK_API_KEY!);

export default class MailService {
	async sendVerificationEmail(
		to: string,
		verificationCode: string,
	): Promise<void> {
		const email = {
			To: to,
			From: SENDER_EMAIL!,
			Subject: 'Verify your email',
			HtmlBody: verificationEmail(verificationCode, FRONTEND_URL!),
			MessageStream: 'broadcast',
		};

		await client.sendEmail(email);
	}

	async sendForgotPasswordEmail(
		to: string,
		verificationCode: string,
	): Promise<void> {
		const email = {
			To: to,
			From: SENDER_EMAIL!,
			Subject: 'Reset password',
			HtmlBody: forgotPasswordEmail(verificationCode, FRONTEND_URL!),
			MessageStream: 'broadcast',
		};

		await client.sendEmail(email);
	}
}
