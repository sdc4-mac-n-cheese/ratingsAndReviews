const { Client, Pool } = require('pg');
require('dotenv').config();

// const client = new Client({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   port: process.env.PORT,
// });

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PGPORT,
});

// client.connect()
let product_id = 1;

const getReviews = function(product_id, callback) {
  console.log(product_id);
  pool.query(`SELECT * FROM review WHERE product_id=${product_id}`, (err, res) => {
    if (err) {
      console.log('err here >>', err);
      // callback(err);
    } else {
      console.log('res here >>', res);
      callback(null, res);
    }
  })
};

const getReviewsMeta = function(product_id, callback) {
  pool.query(`SELECT * FROM review WHERE product_id=${product_id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
      call
    } else {
      console.log(res);
      callback(null, res);
    }
  })
};

const markReviewHelpful = function(id, callback) {
  pool.query(`UPDATE review SET helpfulness = helpfulness + 1 WHERE id=${id}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { getReviews, getReviewsMeta };