import dotenv from 'dotenv';

dotenv.config();

export default {
  appPort: Number(process.env.PORT) || 1234,
  ip: process.env.HOST || '0.0.0.0',
  postgres: process.env.POSTGRES, // Connection string format
  jwtSecret: process.env.JWT_SECRET,
  salt: Number(process.env.SALT),
  baseUrl: process.env.BASEURL,

  // ✅ ADDED: Additional useful config
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  username: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: process.env.DIALECT,
};
