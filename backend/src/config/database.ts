import knex, { Knex } from 'knex';
import path from 'path';

const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'beyout_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, '../../../database/migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(__dirname, '../../../database/seeds'),
  },
};

export const db = knex(knexConfig);

export const connectDatabase = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ Database connected successfully');
    
    // Run migrations
    await db.migrate.latest();
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export default knexConfig;