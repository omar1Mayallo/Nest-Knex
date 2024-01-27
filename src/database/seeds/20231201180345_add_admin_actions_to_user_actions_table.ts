import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.USER_ENTITY_ACTION).del();

  await knex(TABLES.USER_ENTITY_ACTION).insert([
    { email: 'super-admin@gmail.com', action_key: 'users/list' },
    { email: 'super-admin@gmail.com', action_key: 'users/create' },
    { email: 'super-admin@gmail.com', action_key: 'users/update' },
    { email: 'super-admin@gmail.com', action_key: 'users/delete' },
    { email: 'super-admin@gmail.com', action_key: 'roles/list' },
    { email: 'super-admin@gmail.com', action_key: 'roles/create' },
    { email: 'super-admin@gmail.com', action_key: 'roles/update' },
    { email: 'super-admin@gmail.com', action_key: 'roles/delete' },
    { email: 'super-admin@gmail.com', action_key: 'groups/list' },
    { email: 'super-admin@gmail.com', action_key: 'groups/create' },
    { email: 'super-admin@gmail.com', action_key: 'groups/update' },
    { email: 'super-admin@gmail.com', action_key: 'groups/delete' },
    { email: 'super-admin@gmail.com', action_key: 'plans/list' },
    { email: 'super-admin@gmail.com', action_key: 'plans/create' },
    { email: 'super-admin@gmail.com', action_key: 'plans/update' },
    { email: 'super-admin@gmail.com', action_key: 'plans/delete' },
  ]);
}
