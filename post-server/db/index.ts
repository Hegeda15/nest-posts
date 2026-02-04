// src/db/db.ts
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(pool
  
  

);
