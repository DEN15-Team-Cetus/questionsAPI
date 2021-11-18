const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'matthewdowell',
  host: 'localhost',
  database: 'reviews',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

module.exports = pool;
