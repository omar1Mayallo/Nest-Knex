import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ActionName } from 'src/shared/decorators/action-name.decorator';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly i18n: I18nCustomService) {}
  // @DESC: Get All Users
  // @URL: GET => "/"
  @Get()
  @ActionName('users/lists')
  async getAllUsers(_: any) {
    console.log('getAllUsers');
  }

  // @DESC: Get User
  // @URL: PUT => "/:id"
  @Get('/:id')
  async getUser(_: any) {
    console.log('getUser');
  }

  // @DESC: Update User
  // @URL: PUT => "/:id"
  @Put('/:id')
  async updateUser(_: any) {
    console.log('updateUser');
  }

  // @DESC: Delete One Or More Users
  // @URL: DELETE => "/:id"
  @Delete('/:id')
  async deleteUsers(_: any) {
    console.log('deleteUsers');
  }
}
