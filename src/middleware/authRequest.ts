import { NextFunction, Request, Response } from 'express';
import apiError from '../errors/apiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';

const authRequest =
  (...requireRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new apiError(httpStatus.UNAUTHORIZED, 'you are not authorize');
      }

      //   verified token

      const verifyToken = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_token as string
      );
      req.user = verifyToken;

      if (requireRole.length && !requireRole.includes(verifyToken.role)) {
        throw new apiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default authRequest;
