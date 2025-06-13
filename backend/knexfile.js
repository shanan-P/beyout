require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
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
      directory: '../database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: '../database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
};