import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  pgadmin: {
    email: process.env.PGADMIN_DEFAULT_EMAIL,
    password: process.env.PGADMIN_DEFAULT_PASSWORD,
  },
  jwtSecret: process.env.JWT_SECRET,
  spotify: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
}));
