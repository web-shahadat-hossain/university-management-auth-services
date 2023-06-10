import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userServices.createUserServices(user);
    next();
    res.status(200).send({
      status: true,
      message: 'user created successfully !',
      data: result,
    });
  }
);

export const userController = {
  createUserController,
};
