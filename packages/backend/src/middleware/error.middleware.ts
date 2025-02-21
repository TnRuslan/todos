import { HttpError } from '@/helpers/httpError';
import { NextFunction, Response, Request } from 'express';

export const errorMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	next(new HttpError('Something!', 404));
};
