import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.USER_ENTITY_ACTION).del();

  await knex(TABLES.USER_ENTITY_ACTION).insert([
    { email: 'super-admin@gmail.com', action_key: 'dashboard/list' },
    { email: 'super-admin@gmail.com', action_key: 'dashboard/view-details' },
    { email: 'super-admin@gmail.com', action_key: 'settings/list' },
    { email: 'super-admin@gmail.com', action_key: 'settings/view-details' },
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
    { email: 'super-admin@gmail.com', action_key: 'subscriptions/list' },
    { email: 'super-admin@gmail.com', action_key: 'subscriptions/create' },
    { email: 'super-admin@gmail.com', action_key: 'subscriptions/update' },
    { email: 'super-admin@gmail.com', action_key: 'subscriptions/delete' },
    { email: 'super-admin@gmail.com', action_key: 'products/list' },
    { email: 'super-admin@gmail.com', action_key: 'products/create' },
    { email: 'super-admin@gmail.com', action_key: 'products/update' },
    { email: 'super-admin@gmail.com', action_key: 'products/delete' },
    { email: 'super-admin@gmail.com', action_key: 'orders/list' },
    { email: 'super-admin@gmail.com', action_key: 'orders/create' },
    { email: 'super-admin@gmail.com', action_key: 'orders/update' },
    { email: 'super-admin@gmail.com', action_key: 'orders/delete' },
    { email: 'super-admin@gmail.com', action_key: 'clothes/list' },
    { email: 'super-admin@gmail.com', action_key: 'clothes/create' },
    { email: 'super-admin@gmail.com', action_key: 'clothes/update' },
    { email: 'super-admin@gmail.com', action_key: 'clothes/delete' },
    { email: 'super-admin@gmail.com', action_key: 'shoes/list' },
    { email: 'super-admin@gmail.com', action_key: 'shoes/create' },
    { email: 'super-admin@gmail.com', action_key: 'shoes/update' },
    { email: 'super-admin@gmail.com', action_key: 'shoes/delete' },
    { email: 'super-admin@gmail.com', action_key: 'adidas/list' },
    { email: 'super-admin@gmail.com', action_key: 'adidas/create' },
    { email: 'super-admin@gmail.com', action_key: 'adidas/update' },
    { email: 'super-admin@gmail.com', action_key: 'adidas/delete' },
    { email: 'super-admin@gmail.com', action_key: 'nike/list' },
    { email: 'super-admin@gmail.com', action_key: 'nike/create' },
    { email: 'super-admin@gmail.com', action_key: 'nike/update' },
    { email: 'super-admin@gmail.com', action_key: 'nike/delete' },

    { email: 'admin@gmail.com', action_key: 'settings/list' },
    { email: 'admin@gmail.com', action_key: 'roles/list' },
    { email: 'admin@gmail.com', action_key: 'roles/create' },
    { email: 'admin@gmail.com', action_key: 'roles/update' },
    { email: 'admin@gmail.com', action_key: 'roles/delete' },
    { email: 'admin@gmail.com', action_key: 'products/list' },
    { email: 'admin@gmail.com', action_key: 'products/create' },
    { email: 'admin@gmail.com', action_key: 'products/update' },
    { email: 'admin@gmail.com', action_key: 'products/delete' },
    { email: 'admin@gmail.com', action_key: 'shoes/list' },
    { email: 'admin@gmail.com', action_key: 'shoes/create' },
    { email: 'admin@gmail.com', action_key: 'shoes/update' },
    { email: 'admin@gmail.com', action_key: 'shoes/delete' },
  ]);
}
