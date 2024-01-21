import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ENTITY_ACTION, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table.string('action_key').notNullable().unique();
    table.string('en_name').notNullable();
    table.string('ar_name').notNullable();
    table
      .integer('entity_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.ENTITY)
      .notNullable();
    table.string('action_category'); // CRUD

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.ENTITY_ACTION);
}
