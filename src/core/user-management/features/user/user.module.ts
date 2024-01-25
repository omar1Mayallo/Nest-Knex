import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from '../../common/modules/bcrypt/bcrypt.module';

@Module({
  imports: [JwtModule, BcryptModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
