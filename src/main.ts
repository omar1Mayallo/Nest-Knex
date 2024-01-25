import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/env/env.schema';
import { CustomI18nValidationExceptionFilter } from './shared/exceptions/Custom-i18n-exception-filter';
import { i18nExceptionFilterOptions } from './shared/exceptions/i18nExceptionFilterOptions';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // ____________ MIDDLEWARES ____________ //
  // [1] CORS | https://docs.nestjs.com/security/cors#getting-started
  app.enableCors();
  // [2] HELMET | https://helmetjs.github.io/
  app.use(helmet());
  // [3] RATE_LIMITER | https://www.npmjs.com/package/express-rate-limit
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000, // 1 Hour
      max: 1000, // limit each IP to 1000 requests per windowMs
    }),
  );
  // [4] COMPRESSION | https://www.npmjs.com/package/compression
  app.use(compression());

  // ____________ VALIDATION_PIPS ____________ //
  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(
    new CustomI18nValidationExceptionFilter(i18nExceptionFilterOptions),
  );

  // ____________ ACCESS_APP_CONFIGS ____________ //
  const configService = app.get(ConfigService<EnvironmentVariables>);

  // ____________ START_APP ____________ //
  // [1] API Global Prefix
  const globalPrefix = configService.get<string>('API_PREFIX');
  app.setGlobalPrefix(globalPrefix);
  // [2] App Port and Domain
  const port = configService.get<number>('APP_PORT');
  const serverDomain = configService.get<string>('SERVER_URL');
  const mode = configService.get<string>('NODE_ENV');

  await app.listen(port, () => {
    Logger.verbose(
      `App run on ${`${serverDomain}/${globalPrefix} in ${mode} mode`}`,
    );
  });
})();
