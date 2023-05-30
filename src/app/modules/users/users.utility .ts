import { User } from './users.models'
export const findUserId = () => {
  const lastUser = User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastUser
}

export const generateUserId = async () => {
  const lastUserID = await findUserId()
  const currentId = lastUserID?.id || (0).toString().padStart(5, '0')

  const incrementID = (Number(currentId) + 1).toString().padStart(5, '0')

  return incrementID
}
