import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.services';
import config from '../../../config';

// login controller
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authServices.loginUser(loginData);
  const { refreshToken, ...others } = result;
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: others,
  });
});
// refresh Token controller
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
