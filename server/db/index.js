const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PGPORT,
});

pool.connect(() => {
  console.log('db connected');
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, (err, res) => {
      console.log({ text, params })
      callback(err, res)
    })
  },
}

