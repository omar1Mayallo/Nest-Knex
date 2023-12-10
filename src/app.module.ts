import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';

@Module({
  imports: [
    // ENV_CONFIGURATIONS
    ConfigModule.forRoot(ConfigOptions),

    // DATABASE_MODULE
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
