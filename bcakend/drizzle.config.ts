import 'dotenv/config';

export default {
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'jelszo123',
    database: 'NestDb',
  },
};
