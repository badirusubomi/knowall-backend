import { DataSourceOptions } from 'typeorm';
import { path } from 'app-root-path';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(path, '.env') });

export function getConfig() {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl:
      process.env.DB_USE_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : false,
    entities: [join(__dirname, 'entities', '*{.ts,.js}')],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
    logging: process.env.ENABLE_DATABASE_LOGGING === 'true',
  } as DataSourceOptions;
}
