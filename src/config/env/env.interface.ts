import { Environment } from './env.schema';

export interface IEnvironmentVariables {
  NODE_ENV: Environment;
  APP_PORT: number;
  API_PREFIX: string;
  SERVER_DOMAIN: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  FALLBACK_LANGUAGE: string;
}
