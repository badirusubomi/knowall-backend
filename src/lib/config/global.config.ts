export const GlobalConfig = () => {
  return {
    port: process.env.PORT ?? 3000,
    environment:
      process.env.ENVIRONMENT === 'production' ? 'production' : 'dev',
    datasource: {
      type: 'postgres',
      url: process.env.DATABASE_URL,
    },
  };
};
