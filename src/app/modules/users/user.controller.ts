import { NextFunction, Request, Response } from 'express'
import usersServer from './user.services'

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    const result = await usersServer.createUserServices(user)

    res.status(200).send({
      status: true,
      message: 'user created successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createUserController,
}
