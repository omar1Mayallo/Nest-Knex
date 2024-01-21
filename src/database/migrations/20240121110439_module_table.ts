import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.MODULE, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('module_key').notNullable().unique();
    table.string('ar_name').notNullable();
    table.string('en_name').notNullable();
    table.string('source').notNullable();
    table
      .integer('parent_module_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.MODULE);

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.MODULE);
}
