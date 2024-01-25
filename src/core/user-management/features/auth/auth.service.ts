import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/shared/types/entities/user.model';
import { BcryptService } from '../../common/modules/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { JwtService } from '../../common/modules/jwt/jwt.service';
import { IUserTokenResponse } from './types/user-token-response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(body: CreateUserDTO): Promise<IUserTokenResponse> {
    // 1) Create User
    const user = await this.userService.createUser(body);

    // 2) Generate & Send Token
    const token = await this.generateToken(`${user.id}`);

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
