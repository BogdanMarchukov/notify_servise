import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE || 'notify',
  synchronize: false,
}));
