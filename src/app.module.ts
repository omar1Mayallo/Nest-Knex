import { GroupModule } from './core/user-management/features/group/group.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';
import { AuthModule } from './core/user-management/features/auth/auth.module';
import { PermissionsModule } from './core/user-management/features/permissions/permissions.module';
import { RoleModule } from './core/user-management/features/role/role.module';
import { UsersModule } from './core/user-management/features/user/users.module';
import { DatabaseModule } from './database/database.module';
import { I18nCustomModule } from './shared/modules/I18n-custom/I18n-custom.module';

@Module({
  imports: [
    // ENV_CONFIGURATIONS_MODULE
    ConfigModule.forRoot(ConfigOptions),

    // DATABASE_MODULE
    DatabaseModule,

    // I18N_MODULE
    I18nCustomModule,

    // ______ APP_MODULES ______ //
    UsersModule,
    AuthModule,
    RoleModule,
    PermissionsModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
