const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'matthew',
  host: '3.20.204.118',
  database: 'reviews',
  password: 'password321',
  port: 5432,
})

module.exports = pool;
