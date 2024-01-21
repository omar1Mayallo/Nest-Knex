import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.USERS, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('email', 254).notNullable().unique();
    table.string('username', 30).notNullable();
    table.string('password', 25).notNullable();

    // TIMESTAMPS
    table.timestamp('deleted_at').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.USERS);
}
