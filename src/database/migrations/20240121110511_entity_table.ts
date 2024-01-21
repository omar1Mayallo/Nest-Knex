import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ENTITY, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('entity_key').notNullable().unique();
    table.string('entity_url').notNullable();
    table.string('ar_name').notNullable();
    table.string('en_name').notNullable();
    table
      .integer('module_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.MODULE)
      .notNullable();
    table.integer('order').notNullable();

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.ENTITY);
}
