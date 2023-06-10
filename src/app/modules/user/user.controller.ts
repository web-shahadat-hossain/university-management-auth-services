import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userServices.createUserServices(user);
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully !',
      data: result,
    });
  }
);

export const userController = {
  createUserController,
};
