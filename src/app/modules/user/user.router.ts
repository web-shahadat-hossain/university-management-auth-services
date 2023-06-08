import express from 'express'
import { userController } from './user.controller'
import validateRequest from '../../../middleware/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUserController
)

export const userRouters = {
  router,
}
