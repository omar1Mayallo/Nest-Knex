import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';

@Injectable()
export class RepositoryService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  // async getOne() {}
  // async getAll() {}
  // async createOne() {}
  // async createMany() {}
  // async updateOne() {}
  // async updateMany() {}
  // async deleteOne() {}
  // async deleteMany() {}
}
