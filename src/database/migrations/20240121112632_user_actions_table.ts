import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.USER_ENTITY_ACTION, (table) => {
    // PK
    table.increments('id').primary();

    // INFO
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.USERS)
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('action_id')
      .unsigned()
      .references('id')
      .inTable(TABLES.ENTITY_ACTION)
      .onDelete('CASCADE')
      .notNullable();

    // TIMESTAMPS
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.USER_ENTITY_ACTION);
}
