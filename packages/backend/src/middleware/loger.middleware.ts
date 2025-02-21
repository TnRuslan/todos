import { NextFunction, Response, Request } from 'express';

export const logger = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	console.log(`logger: ${req.method} ${req.url}`);
	next();
};
