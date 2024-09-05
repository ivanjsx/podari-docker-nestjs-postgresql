export const mainConfig = () => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    cors: {
      origin: process.env.APP_CORS_ORIGIN || 'http://localhost:3001',
    },
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME || 'kupipodariday',
    schema: process.env.DATABASE_SCHEMA || 'kupipodariday',
    username: process.env.DATABASE_USERNAME || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
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
