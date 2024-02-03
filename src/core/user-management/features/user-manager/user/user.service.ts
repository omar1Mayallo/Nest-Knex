import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import {
  UserActionsModel,
  UserModel,
} from 'src/shared/types/entities/user-management.model';
import { TABLES } from './../../../../../shared/constants/tables';
import { CreateUserDTO } from './dto/create-user.dto';

import { BcryptService } from 'src/core/user-management/common/modules/bcrypt/bcrypt.service';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { GetAllResponse } from 'src/shared/modules/repository/repository.types';
import { GetAllUsersDTO } from './dto/get-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly bcryptService: BcryptService,
    private readonly repoService: RepositoryService<UserModel>,
  ) {}

  async createUser(body: CreateUserDTO): Promise<UserModel> {
    // 1) Check If Email already exists
    const emailExist = await this.repoService.getOne(
      TABLES.USERS,
      {
        email: body.email,
      },
      { withNotFoundError: false },
    );
    if (emailExist) {
      throw new BadRequestException(
        'Email already exist, Please use another one',
      );
    }

    // 2) Hash the password before Inserting
    const hashedPassword = await this.bcryptService.hash(body.password);

    // 3) Create a new user
    const newUser = { ...body, password: hashedPassword };
    const [createdUser] = await this.knex(TABLES.USERS)
      .insert(newUser)
      .returning('*');

    return createdUser;
  }

  async getAllUsers(query: GetAllUsersDTO): Promise<GetAllResponse<UserModel>> {
    return await this.repoService.getAll(TABLES.USERS, query);
  }

  async getUser(id: number): Promise<UserModel> {
    return await this.repoService.getOne(TABLES.USERS, { id });
  }

  async deleteUsers(ids: number[]) {
    await this.repoService.deleteByIds(TABLES.USERS, ids);
  }

  async updatedUser(id: number, body: UpdateUserDTO) {
    if (body.password) {
      const hashedPassword = await this.bcryptService.hash(body.password);
      body.password = hashedPassword;
    }
    return await this.repoService.updateOne(TABLES.USERS, { id }, body);
  }

  ////////////////////////////////////////////////////////////////////////
  async getLoggedUserPermissions(email: string) {
    const userPermissions = await this.knex<UserActionsModel>(
      TABLES.USER_ENTITY_ACTION,
    )
      .where({ email })
      .select('action_key')
      .pluck('action_key');

    return userPermissions;
  }
  async verifyPermissions(
    email: string,
    action: string | string[],
  ): Promise<boolean> {
    // 1) Get Current User Permissions (or Actions)
    const userPermissions = await this.getLoggedUserPermissions(email);

    // 2) verify action(s) in User Permissions
    if (Array.isArray(action)) {
      // 2-1) action as [act-1, act-2, act-3] .. check at least one in userPermissions
      return userPermissions.some((userAction: string) =>
        action.includes(userAction),
      );
    }
    // 2-2) action as act-1 .. check it exists in userPermissions
    else return userPermissions.includes(action);
  }
}
