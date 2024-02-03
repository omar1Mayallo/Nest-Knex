import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { USER_ACTIONS } from 'src/shared/constants/actions';
import { ActionName } from 'src/shared/decorators/action-name.decorator';
import { IsValidParamIdDTO } from 'src/shared/dtos/is-valid-id-param.dto';
import { IsValidArrayIdsDTO } from 'src/shared/dtos/is-valid-ids-arr.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetAllUsersDTO } from './dto/get-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @DESC: Create a new user
  // @URL: POST => "/users"
  @Post()
  @ActionName(USER_ACTIONS.CREATE_USER)
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  // @DESC: Get All Users
  // @URL: GET => "/users"
  @Get()
  @ActionName(USER_ACTIONS.LIST_USERS)
  async getAllUsers(@Query() query: GetAllUsersDTO) {
    return await this.userService.getAllUsers(query);
  }

  // @DESC: Get User
  // @URL: PUT => "/users/:id"
  @Get('/:id')
  @ActionName(USER_ACTIONS.LIST_USERS)
  async getUser(@Param() param: IsValidParamIdDTO) {
    return await this.userService.getUser(param.id);
  }

  // @DESC: Update User
  // @URL: PUT => "/users/:id"
  @Put('/:id')
  @ActionName(USER_ACTIONS.UPDATE_USER)
  async updateUser(
    @Param() param: IsValidParamIdDTO,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.userService.updatedUser(param.id, body);
  }

  // @DESC: Delete One Or More Users
  // @URL: DELETE => "/users"
  @Delete()
  @ActionName(USER_ACTIONS.DELETE_USERS)
  async deleteUsers(@Body() body: IsValidArrayIdsDTO) {
    await this.userService.deleteUsers(body.ids);
  }
}
