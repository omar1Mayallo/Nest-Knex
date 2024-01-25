import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt.types';

@Injectable()
export class BcryptService implements IBcryptService {
  saltRounds = 12;

  async hash(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  async compare(
    plaintextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hashPassword);
  }
}
