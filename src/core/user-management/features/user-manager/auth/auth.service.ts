import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/core/user-management/common/modules/bcrypt/bcrypt.service';
import { JwtService } from 'src/core/user-management/common/modules/jwt/jwt.service';
import { TABLES } from 'src/shared/constants/tables';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDTO } from './dto/login.dto';
import { IUserTokenResponse } from './types/user-token-response.type';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly repoService: RepositoryService<UserModel>,
  ) {}

  async register(body: CreateUserDTO): Promise<IUserTokenResponse> {
    // 1) Create User
    const user = await this.userService.createUser(body);

    // 2) Generate Token
    const token = await this.generateToken(`${user.id}`);

    delete user.password;

    return { user, token };
  }

  async login(body: LoginUserDTO): Promise<IUserTokenResponse> {
    // 1) Check If User is Exist and Password Is Correct
    const user = await this.repoService.getOne(
      TABLES.USERS,
      {
        email: body.email,
      },
      { withNotFoundError: false },
    );
    if (
      !user ||
      !(await this.bcryptService.compare(body.password, user.password))
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    // 2) Generate Token
    const token = await this.generateToken(`${user.id}`);

    delete user.password;

    return { user, token };
  }

  //_________________|PRIVATE|_________________//
  private async generateToken(id: string): Promise<string> {
    return this.jwtService.signToken(
      { id },
      this.configService.get<string>('JWT_SECRET'),
      this.configService.get<string>('JWT_EXPIRATION_DATE'),
    );
  }
}
