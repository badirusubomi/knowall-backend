export const GlobalConfig = {
  port: process.env.PORT ?? 3000,
  environment: process.env.ENVIRONMENT === 'production' ? 'production' : 'dev',
  datasource: {
    type: 'postgres',
    url: process.env.DATABASEURL,
    database: '',
    migrations: '',
    entities: '',
  },
};
