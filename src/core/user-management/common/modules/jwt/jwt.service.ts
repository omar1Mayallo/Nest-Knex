import { Injectable } from '@nestjs/common';
import { JwtService as JwtTokenService } from '@nestjs/jwt';
import { IJwtPayload, IJwtService } from './jwt.types';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: JwtTokenService) {}

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verify(token);
  }

  signToken(payload: IJwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
