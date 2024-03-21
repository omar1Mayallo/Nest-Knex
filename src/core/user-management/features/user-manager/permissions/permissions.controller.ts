import { PermissionsService } from './permissions.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IsAuthenticationGuard } from 'src/shared/decorators/is-auth-guard.decorator';
import { LoggedUser } from 'src/shared/decorators/logged-user.decorator';
import { UserModel } from 'src/shared/types/entities/user-management.model';

@UseGuards(AuthGuard)
@IsAuthenticationGuard()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  // @DESC: GET All System Permissions
  // @URL: GET => "/permissions/system"
  @Get('/system')
  async getSystemPermissions() {
    console.log('System Permissions');
  }

  // @DESC: GET All Logged User Permissions
  // @URL: GET => "/permissions/logged-user"
  @Get('/logged-user')
  async getLoggedUserPermissions(@LoggedUser() user: UserModel) {
    return await this.permissionService.getLoggedUserPermissions(
      user.email,
      user.type,
    );
  }

  // @DESC: GET All Logged User Permissions
  // @URL: GET => "/permissions/logged-user-actions"
  @Get('/logged-user-actions')
  async getLoggedUserActions(@LoggedUser() user: UserModel) {
    return await this.permissionService.getLoggedUserActions(user.email);
  }
}
