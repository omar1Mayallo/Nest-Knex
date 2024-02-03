import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { RoleModel } from 'src/shared/types/entities/user-management.model';
import { TABLES } from 'src/shared/constants/tables';
import { GetAllRolesDTO } from './dto/get-roles.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly repoService: RepositoryService<RoleModel>,
  ) {}

  async createRole(body: CreateRoleDTO) {
    const [createdRole] = await this.knex(TABLES.ROLES)
      .insert(body)
      .returning('*');

    return createdRole;
  }

  async getAllRoles(query: GetAllRolesDTO) {
    return await this.repoService.getAll(TABLES.ROLES, query);
  }

  async getRole(id: number) {
    return await this.repoService.getOne(TABLES.ROLES, { id });
  }

  async updateRole(id: number, body: UpdateRoleDTO) {
    return await this.repoService.updateOne(TABLES.ROLES, { id }, body);
  }
  async deleteRoles(ids: number[]) {
    return await this.repoService.deleteByIds(TABLES.ROLES, ids);
  }
}
