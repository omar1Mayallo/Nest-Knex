import { Controller, Get } from '@nestjs/common';

@Controller('permissions')
export class PermissionsController {
  // @DESC: Get All Permissions
  // @URL: GET => "/"
  @Get()
  async getAllSystemPermissions(body: any) {
    console.log('getAllPermissions');
  }
}
