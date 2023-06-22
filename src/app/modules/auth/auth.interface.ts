export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  secretToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
