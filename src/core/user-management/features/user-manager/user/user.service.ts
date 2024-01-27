import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import {
  UserActionsModel,
  UserModel,
} from 'src/shared/types/entities/user-management.model';
import { TABLES, TableKeys } from './../../../../../shared/constants/tables';
import { CreateUserDTO } from './dto/create-user.dto';

import { BcryptService } from 'src/core/user-management/common/modules/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(body: CreateUserDTO): Promise<UserModel> {
    // 1) Check If Email already exists
    const emailExist = await this.getOneOrFail<UserModel>(TABLES.USERS, {
      email: body.email,
    });
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

  // !! TRANSPORT
  async getOneOrFail<ITable>(
    tableName: TableKeys,
    conditions: Partial<ITable>,
    options?: {
      selectOptions?: (keyof ITable)[];
      withSoftDeleted?: boolean;
      withNotFoundError?: boolean;
    },
  ): Promise<ITable> {
    let query = this.knex<ITable>(tableName).where(conditions);

    if (options?.selectOptions) {
      query = query.select(options.selectOptions);
    }

    if (options?.withSoftDeleted) {
      query = query.whereNotNull('deletedAt');
    }

    const result = await query.first();

    if (options?.withNotFoundError) {
      if (!result) {
        throw new NotFoundException('This Row Not Found');
      }
    }

    return result as ITable;
  }
}
