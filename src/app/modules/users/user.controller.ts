import { Request, Response } from 'express'
import usersServer from './user.services'

const createUserController = async (req: Request, res: Response) => {
  const result = await usersServer.createUserServices(req.body)
  try {
    res.status(200).send({
      status: true,
      message: 'user created successfully !',
      data: result,
    })
  } catch (err) {
    res.status(400).send({
      status: false,
      message: 'Failed to create user! ',
    })
  }
}

export default {
  createUserController,
}
