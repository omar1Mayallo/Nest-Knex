import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.ENTITY).del();

  await knex(TABLES.ENTITY).insert([
    {
      module_key: 'admin-panel',
      entity_key: 'dashboard',
      en_name: 'Dashboard',
      ar_name: 'لوحة التحكم',
      entity_url: 'dashboard',
      order: 0,
      icon: 'Dashboard',
    },
    {
      module_key: 'users-management',
      entity_key: 'users',
      en_name: 'Users',
      ar_name: 'المستخدمين',
      entity_url: 'users-management/users',
      order: 1,
      icon: 'AccountCircle',
    },
    {
      module_key: 'users-management',
      entity_key: 'roles',
      en_name: 'Roles',
      ar_name: 'الأدوار',
      entity_url: 'users-management/roles',
      order: 2,
      icon: 'PsychologyAlt',
    },
    {
      module_key: 'users-management',
      entity_key: 'groups',
      en_name: 'Groups',
      ar_name: 'المجموعات',
      entity_url: 'users-management/groups',
      order: 3,
      icon: 'Groups',
    },
    {
      module_key: 'admin-panel',
      entity_key: 'settings',
      en_name: 'Settings',
      ar_name: 'الاعدادات',
      entity_url: 'settings',
      order: 12,
      icon: 'Settings',
    },
  ]);
}
