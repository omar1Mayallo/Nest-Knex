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
      icon: 'People', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'billing-management',
      en_name: 'Billing Management',
      ar_name: 'إدارة الفواتير',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'Note', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'products-management',
      en_name: 'Products Management',
      ar_name: 'إدارة المنتجات',
      source: USER_TYPE.ADMINISTRATIVE,
      parent_key: 'admin-panel',
    },
    {
      module_key: 'categories',
      en_name: 'Categories',
      ar_name: 'الفئات',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'Category', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'products-management',
    },
    {
      module_key: 'brands',
      en_name: 'Brands',
      ar_name: 'الماركات',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'BrandingWatermark', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'categories',
    },
    {
      module_key: 'portal-panel',
      en_name: 'Portal Panel',
      ar_name: 'لوحة البوابة',
      source: USER_TYPE.PORTAL,
    },
  ]);
}
