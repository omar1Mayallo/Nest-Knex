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
import { IsValidArrayIdsDTO } from 'src/shared/dtos/is-valid-ids-arr.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { GetAllRolesDTO } from './dto/get-roles.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RoleService } from './role.service';
import { AuthGuard } from '../../user-manager/auth/guards/auth.guard';
import { IsValidParamIdDTO } from 'src/shared/dtos/is-valid-id-param.dto';
import { IsAuthenticationGuard } from 'src/shared/decorators/is-auth-guard.decorator';

@UseGuards(AuthGuard)
@IsAuthenticationGuard()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @DESC: Create a new role
  // @URL: POST => "/roles"
  @Post()
  async createRole(@Body() body: CreateRoleDTO) {
    return await this.roleService.createRole(body);
  }

  // @DESC: Get All Roles
  // @URL: GET => "/roles"
  @Get()
  async getAllRoles(@Query() query: GetAllRolesDTO) {
    return await this.roleService.getAllRoles(query);
  }

  // @DESC: Get Role
  // @URL: GET => "/roles/:id"
  @Get('/:id')
  async getRole(@Param() param: IsValidParamIdDTO) {
    return await this.roleService.getRole(param.id);
  }

  // @DESC: Update Role
  // @URL: PUT => "/roles/:id"
  @Put('/:id')
  async updateRole(
    @Param() param: IsValidParamIdDTO,
    @Body() body: UpdateRoleDTO,
  ) {
    return await this.roleService.updateRole(param.id, body);
  }

  // @DESC: Delete One Or More Roles
  // @URL: DELETE => "/roles"
  @Delete()
  async deleteRoles(@Body() body: IsValidArrayIdsDTO) {
    await this.roleService.deleteRoles(body.ids);
  }
}
