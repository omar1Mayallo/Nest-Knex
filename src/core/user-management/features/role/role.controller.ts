import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('roles')
export class RoleController {
  // @DESC: Create A Role
  // @URL: POST => "/"
  @Post()
  async createRole(body: any) {
    console.log('createRole');
  }

  // @DESC: Get All Roles
  // @URL: GET => "/"
  @Get()
  async getAllRoles(body: any) {
    console.log('getAllRoles');
  }

  // @DESC: Update Role
  // @URL: PUT => "/:id"
  @Put('/:id')
  async updateRole(body: any) {
    console.log('updateRole');
  }

  // @DESC: Delete One Or More Roles
  // @URL: DELETE => "/:id"
  @Delete('/:id')
  async deleteRoles(body: any) {
    console.log('deleteRoles');
  }
}
