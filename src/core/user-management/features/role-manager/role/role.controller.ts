import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('roles')
export class RoleController {
  // @DESC: Create A Role
  // @URL: POST => "/"
  @Post()
  async createRole(_: any) {
    console.log('createRole');
  }

  // @DESC: Get All Roles
  // @URL: GET => "/"
  @Get()
  async getAllRoles(_: any) {
    console.log('getAllRoles');
  }

  // @DESC: Update Role
  // @URL: PUT => "/:id"
  @Put('/:id')
  async updateRole(_: any) {
    console.log('updateRole');
  }

  // @DESC: Delete One Or More Roles
  // @URL: DELETE => "/:id"
  @Delete('/:id')
  async deleteRoles(_: any) {
    console.log('deleteRoles');
  }
}
