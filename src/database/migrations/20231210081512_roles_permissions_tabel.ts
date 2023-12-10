import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLES.ROLES_PERMISSIONS, (table) => {
    table.increments('id').primary();
    table
      .integer('role_id')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table
      .integer('permission_id')
      .unsigned()
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE');
    // Ensure that each combination of role_id and permission_id is unique
    table.unique(['role_id', 'permission_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLES.ROLES_PERMISSIONS);
}
