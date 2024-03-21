// seed_modules.ts
import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';
import { USER_TYPE } from '../../shared/types/enums';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.MODULE).del();

  await knex(TABLES.MODULE).insert([
    {
      module_key: 'admin-panel',
      en_name: 'Admin Panel',
      ar_name: 'لوحة التحكم للمشرف',
      source: USER_TYPE.ADMINISTRATIVE,
    },
    {
      module_key: 'users-management',
      en_name: 'Users Management',
      ar_name: 'إدارة المستخدمين',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'Diversity3', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'portal-panel',
      en_name: 'Portal Panel',
      ar_name: 'لوحة البوابة',
      source: USER_TYPE.PORTAL,
    },
  ]);
}
