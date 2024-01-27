import { UserModel } from 'src/shared/types/entities/user-management.model';

export interface IUserTokenResponse {
  user: UserModel;
  token: string;
}
