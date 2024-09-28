export const mainConfig = () => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3001,
    cors: {
      origin: process.env.APP_CORS_ORIGIN || 'https://podari.ivanjsx.com',
    },
  },
  database: {
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    name: process.env.POSTGRES_DB || 'kupipodariday',
    schema: process.env.POSTGRES_SCHEMA || 'kupipodariday',
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
  },
  jwt: {
    ttl: process.env.JWT_TTL || '10h',
    secret: process.env.JWT_SECRET || 'yes-i-do-masturbate-to-my-own-code',
  },
  throttler: {
    ttl: parseInt(process.env.THROTTLER_TTL) || 60,
    limit: parseInt(process.env.THROTTLER_LIMIT) || 10,
  },
});
