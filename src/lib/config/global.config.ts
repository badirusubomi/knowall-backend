export const GlobalConfig = () => {
  return {
    port: process.env.PORT ?? 3000,
    environment:
      process.env.ENVIRONMENT === 'production' ? 'production' : 'dev',
    datasource: {
      type: 'postgres',
      url: process.env.DATABASE_URL,
    },
    cache: {
      service: process.env.CACHE_SERVICE ?? 'redis',
    },
    redis: {
      host: 'localhost',
      port: 6379,
      url: process.env.REDIS_URL ?? 'redis',
      password: process.env.REDIS_PASSWORD ?? 'redis_password',
    },
  };
};
