import config from '../../../config'
import apiError from '../../../errors/apiError'
import { IUser } from './users.Interface'
import { User } from './users.models'
import { generateUserId } from './users.utility '

const createUserServices = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()

  user.id = id

  if (!user.password) {
    user.password = config.Default_User_Pass as string
  }

  const userCreate = await User.create(user)

  if (!userCreate) {
    throw new apiError(400, 'Failed to create user!')
  }

  return userCreate
}

export default {
  createUserServices,
}
