import { join } from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { path } from 'app-root-path';
import { getConfig } from './migration.config';

config({ path: join(path, '.env') });

const dataSource = new DataSource(getConfig());
dataSource.initialize();

export { dataSource };
