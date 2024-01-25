import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BcryptService } from '../../common/modules/bcrypt/bcrypt.service';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { User } from 'src/shared/types/entities/user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { TABLES } from 'src/shared/constants/tables';

@Injectable()
export class UserService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(body: CreateUserDTO): Promise<User> {
    // 1) Check If Email already exists
    const emailExist = await this.findOneWithConditions<User>(
      TABLES.USERS,
      { email: body.email },
      true,
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

  //_________________|PRIVATE|_________________//

  private async findOneWithConditions<ITable>(
    tableName: string,
    conditions: Record<string, any>,
    withSoftDeleted: boolean = false,
  ) {
    let query = this.knex<ITable>(tableName).where(conditions);

    if (!withSoftDeleted) {
      query = query.whereNull('deletedAt');
    }

    return await query.first();
  }
}
