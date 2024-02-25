import { PermissionsModule } from './core/user-management/features/user-manager/permissions/permissions.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';
import { DatabaseModule } from './database/database.module';
import { I18nCustomModule } from './shared/modules/I18n-custom/I18n-custom.module';
import { CustomHelpersModule } from './shared/modules/custom-helpers/custom-helpers.module';
import { UserModule } from './core/user-management/features/user-manager/user/user.module';
import { AuthModule } from './core/user-management/features/user-manager/auth/auth.module';
import { RoleModule } from './core/user-management/features/role-manager/role/role.module';
import { GroupModule } from './core/user-management/features/group-manager/group/group.module';
import { RepositoryModule } from './shared/modules/repository/repository.module';

@Module({
  imports: [
    PermissionsModule,
    // ______ BASE_CONFIGURATIONS_MODULES ______ //
    // ENV_CONFIGURATIONS_MODULE [Global]
    ConfigModule.forRoot(ConfigOptions),

    // DATABASE_MODULE [Global]
    DatabaseModule,

    // I18N_MODULE [Global]
    I18nCustomModule,

    // HELPERS_MODULE [Global]
    CustomHelpersModule,

    // REPOSITORY_MODULE [Global]
    RepositoryModule,

    // ______ APP_MODULES ______ //
    UserModule,
    AuthModule,
    RoleModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
