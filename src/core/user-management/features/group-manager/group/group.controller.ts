import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('groups')
export class GroupController {
  // @DESC: Create A Group
  // @URL: POST => "/"
  @Post()
  async createGroup(_: any) {
    console.log('createGroup');
  }

  // @DESC: Get All Groups
  // @URL: GET => "/"
  @Get()
  async getAllGroups(_: any) {
    console.log('getAllGroups');
  }

  // @DESC: Update Group
  // @URL: PUT => "/:id"
  @Put('/:id')
  async updateGroup(_: any) {
    console.log('updateGroups');
  }

  // @DESC: Delete One Or More Groups
  // @URL: DELETE => "/:id"
  @Delete('/:id')
  async deleteGroups(_: any) {
    console.log('deleteGroups');
  }
}
