import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ROLES, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('name', 100).notNullable().unique();
    table.string('description', 255).nullable();
    table.string('status', 50).notNullable();
    table.string('type', 50);

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.ROLES);
}
