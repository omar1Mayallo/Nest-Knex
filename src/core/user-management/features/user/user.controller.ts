import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';

@Controller('users')
export class UserController {
  constructor(private readonly i18n: I18nCustomService) {}
  // @DESC: Create A User
  // @URL: POST => "/"
  @Post()
  async createUser(body: any) {
    console.log('createUser');
  }

  // @DESC: Get All Users
  // @URL: GET => "/"
  @Get()
  async getAllUsers(body: any) {
    console.log('getAllUsers');
  }

  // @DESC: Get User
  // @URL: PUT => "/:id"
  @Get('/:id')
  async getUser(body: any) {
    console.log('getUser');
  }

  // @DESC: Update User
  // @URL: PUT => "/:id"
  @Put('/:id')
  async updateUser(body: any) {
    console.log('updateUser');
  }

  // @DESC: Delete One Or More Users
  // @URL: DELETE => "/:id"
  @Delete('/:id')
  async deleteUsers(body: any) {
    console.log('deleteUsers');
  }
}
