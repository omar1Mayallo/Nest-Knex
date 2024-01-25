import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';
import { AuthModule } from './core/user-management/features/auth/auth.module';
import { GroupModule } from './core/user-management/features/group/group.module';
import { PermissionsModule } from './core/user-management/features/permissions/permissions.module';
import { RoleModule } from './core/user-management/features/role/role.module';
import { UserModule } from './core/user-management/features/user/user.module';
import { DatabaseModule } from './database/database.module';
import { I18nCustomModule } from './shared/modules/I18n-custom/I18n-custom.module';
import { CustomHelpersModule } from './shared/modules/custom-helpers/custom-helpers.module';

@Module({
  imports: [
    // ENV_CONFIGURATIONS_MODULE [Global]
    ConfigModule.forRoot(ConfigOptions),

    // DATABASE_MODULE [Global]
    DatabaseModule,

    // I18N_MODULE [Global]
    I18nCustomModule,

    // HELPERS [Global]
    CustomHelpersModule,

    // ______ APP_MODULES ______ //
    UserModule,
    AuthModule,
    RoleModule,
    PermissionsModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
