import { UsersModule } from './features/user-management/modules/user/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';
import { DatabaseModule } from './database/database.module';
import { I18nCustomModule } from './shared/modules/I18n-custom/I18n-custom.module';

@Module({
  imports: [
    UsersModule,
    // ENV_CONFIGURATIONS_MODULE
    ConfigModule.forRoot(ConfigOptions),

    // DATABASE_MODULE
    DatabaseModule,

    // I18N_MODULE
    I18nCustomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
