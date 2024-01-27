import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  id: number;

  username: string;

  email: string;

  password: string;

  deletedAt?: Date;
}

export class UserActionsModel extends BaseModel {
  email: string;

  action_key: string;
}
