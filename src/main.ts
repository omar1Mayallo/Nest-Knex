import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './config/env/env.interface';
import { EnvironmentVariables } from './config/env/env.schema';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // ____________ MIDDLEWARES ____________ //
  // [1] CORS | https://docs.nestjs.com/security/cors#getting-started
  app.enableCors();
  // [2] HELMET | https://helmetjs.github.io/
  app.use(helmet);
  // [3] RATE_LIMITER | https://www.npmjs.com/package/express-rate-limit
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000, // 1 Hour
      max: 500, // limit each IP to 500 requests per windowMs
    }),
  );
  // [4] COMPRESSION | https://www.npmjs.com/package/compression
  app.use(compression());

  // ____________ EXCEPTIONS_FILTERS_&_VALIDATION_PIPS ____________ //
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ____________ ACCESS_APP_CONFIGS ____________ //
  const configService = app.get(ConfigService<EnvironmentVariables>);

  // ____________ START_APP ____________ //
  // [1] API Global Prefix
  const globalPrefix = configService.get<string>('API_PREFIX');
  app.setGlobalPrefix(globalPrefix);
  // [2] App Port and Domain
  const port = configService.get<number>('APP_PORT');
  const serverDomain = configService.get<string>('SERVER_DOMAIN');

  await app.listen(port, () => {
    Logger.verbose(`Application run on ${`${serverDomain}/${globalPrefix}`}`);
  });
})();
