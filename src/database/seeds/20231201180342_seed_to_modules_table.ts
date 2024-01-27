import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.MODULE).del();

  await knex(TABLES.MODULE).insert([
    {
      module_key: 'admin_panel',
      en_name: 'Admin Panel',
      ar_name: 'لوحة الادارة',
      source: 'ADMIN_PANEL',
    },
    {
      module_key: 'users_management',
      en_name: 'Users Management',
      ar_name: 'إدارة المستخدمين',
      source: 'ADMIN_PANEL',
      parent_key: 'admin_panel',
    },
    {
      module_key: 'billing_management',
      en_name: 'Billing Management',
      ar_name: 'إدارة الفواتير',
      source: 'ADMIN_PANEL',
      parent_key: 'admin_panel',
    },
    {
      module_key: 'product_management',
      en_name: 'Product Management',
      ar_name: 'إدارة المنتجات',
      source: 'ADMIN_PANEL',
      parent_key: 'admin_panel',
    },
    {
      module_key: 'developers_panel',
      en_name: 'Developers Panel',
      ar_name: 'لوحة المطورين',
      source: 'DEV_PANEL',
    },
  ]);
}
