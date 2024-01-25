import { User } from 'src/shared/types/entities/user.model';

export interface IUserTokenResponse {
  user: User;
  token: string;
}
