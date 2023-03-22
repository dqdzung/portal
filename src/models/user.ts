import { BaseModel } from '.';

export interface User extends BaseModel {
  password: string;
  username: string;
}

export type LoginUser = Pick<User, 'username' | 'password'>;

// export type LoginUserResponse = {
//   // user: User;
//   // accessToken: string;
//   // refreshToken: string;

// };
