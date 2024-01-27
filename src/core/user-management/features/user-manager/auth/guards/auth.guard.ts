// authorization.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from 'src/core/user-management/common/modules/jwt/jwt.service';
import { TABLES } from 'src/shared/constants/tables';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { UserService } from '../../user/user.service';

export interface AuthRequest extends Request {
  user: UserModel;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    // 1) Extract Custom MetaData
    const actionName = this.reflector.get<string>(
      'actionName',
      context.getHandler(), // For (method-level)
    );
    const isAuthenticationOnly = // For (class-level and method-level)
      this.reflector.getAllAndOverride<boolean>('isAuthenticationOnly', [
        context.getHandler(),
        context.getClass(),
      ]) || false;

    // 2) Extract token From Headers "Bearer <JWT>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authentication required, please try to login again',
      );
    }
    const token = authHeader.split(' ')[1];

    // 3) Verify token
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verifyToken(token);
    } catch (err) {
      throw new UnauthorizedException(
        'Invalid or expired token, please try to login again',
      );
    }

    // 4) Get logged user
    const loggedUser = await this.userService.getOneOrFail<UserModel>(
      TABLES.USERS,
      { id: decodedToken.id },
    );
    if (!loggedUser) {
      throw new UnauthorizedException(
        'User not found, please try to login again',
      );
    }
    req.user = loggedUser;

    // 5) If isAuthenticationOnly is true, STOP HERE (Authentication Guard)
    if (isAuthenticationOnly) {
      return true;
    }

    console.log('ssssssssssssssssss');

    // 6) Authorization check
    const isUserHaveAccess = await this.userService.verifyPermissions(
      loggedUser.email,
      actionName,
    );
    if (!isUserHaveAccess) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}