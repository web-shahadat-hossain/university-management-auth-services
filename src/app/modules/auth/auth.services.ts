import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
import { User } from '../user/user.models';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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

  const { id: userId, role, needsPasswordChange } = isExistUser;

  const secretToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret_token as Secret,
    config.jwt.secret_expire_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    secretToken,
    refreshToken,
    needsPasswordChange: needsPasswordChange || false,
  };
};
const refreshToken = async (token: string) => {
  const user = new User();
  let verifyToken = null;

  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as string
    );
  } catch (err) {
    throw new apiError(httpStatus.FORBIDDEN, 'Invalid Refresh token ');
  }

  if (
    !verifyToken ||
    typeof verifyToken !== 'object' ||
    !('userId' in verifyToken)
  ) {
    throw new apiError(httpStatus.FORBIDDEN, 'Invalid Refresh token');
  }

  const { userId } = verifyToken;
  const isExistUser = await user.isExistUser(userId);
  if (!isExistUser) {
    throw new apiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    { id: isExistUser.id, role: isExistUser.role },
    config.jwt.secret_token as Secret,
    config.jwt.secret_expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
