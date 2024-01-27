import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.ENTITY).del();

  await knex(TABLES.ENTITY).insert([
    {
      module_key: 'admin_panel',
      entity_key: 'dashboard',
      en_name: 'Dashboard',
      ar_name: 'لوحة التحكم',
      entity_url: 'dashboard',
      order: 1,
    },
    {
      module_key: 'users_management',
      entity_key: 'users',
      en_name: 'Users',
      ar_name: 'المستخدمين',
      entity_url: 'users',
      order: 2,
    },
    {
      module_key: 'users_management',
      entity_key: 'roles',
      en_name: 'Roles',
      ar_name: 'الأدوار',
      entity_url: 'roles',
      order: 3,
    },
    {
      module_key: 'users_management',
      entity_key: 'groups',
      en_name: 'Groups',
      ar_name: 'المجموعات',
      entity_url: 'groups',
      order: 4,
    },
    {
      module_key: 'billing_management',
      entity_key: 'plans',
      en_name: 'Plans',
      ar_name: 'خطط الأسعار',
      entity_url: 'plans',
      order: 5,
    },
    {
      module_key: 'billing_management',
      entity_key: 'subscriptions',
      en_name: 'Subscriptions',
      ar_name: 'الاشتراكات',
      entity_url: 'subscriptions',
      order: 6,
    },
    {
      module_key: 'product_management',
      entity_key: 'products',
      en_name: 'Products',
      ar_name: 'المنتجات',
      entity_url: 'products',
      order: 7,
    },
    {
      module_key: 'product_management',
      entity_key: 'categories',
      en_name: 'Categories',
      ar_name: 'الفئات',
      entity_url: 'categories',
      order: 8,
    },
    {
      module_key: 'product_management',
      entity_key: 'orders',
      en_name: 'Product Orders',
      ar_name: 'طلبات المنتجات',
      entity_url: 'product-orders',
      order: 9,
    },
    {
      module_key: 'admin_panel',
      entity_key: 'settings',
      en_name: 'Settings',
      ar_name: 'الإعدادات',
      entity_url: 'settings',
      order: 10,
    },
  ]);
}
