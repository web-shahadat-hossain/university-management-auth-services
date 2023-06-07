import { RequestHandler } from 'express'
import { userServices } from './user.services'

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await userServices.createUserServices(user)

    res.status(200).send({
      status: true,
      message: 'user created successfully !',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const userController = {
  createUserController,
}
