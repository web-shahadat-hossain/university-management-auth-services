import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
import { User } from '../user/user.models';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  //   check use exist
  const user = new User();
  const isExistUser = await user.isExistUser(id);

  if (!isExistUser) {
    throw new apiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // password match
  if (
    isExistUser.password &&
    !user.matchPassword(password, isExistUser.password)
  ) {
    throw new apiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }
};

export const authServices = {
  loginUser,
};
