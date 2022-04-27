const axios = require ('axios')
const express = require ('express')
// const RR = require('./db/index.js')
const { reviews, meta, markHelpful, markReported, postreview } = require('./queries.js')

const app = express();
const PORT = 3000;

app.use(express.json());

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PGPORT,
});

// pool.connect(() => {
//   console.log('db connected');
// })

app.get('/reviews', (req, res) => {
  let page = '1';
  let count = '5';
  let product_id = '2';
  let offset = (Number(page) - 1) * Number(count);
  pool.query( reviews, [count, offset.toString(), req.query.product_id])
  // pool.query(reviews, [product_id])
    .then((data) => {
      console.log('data>>', data.rows[0])
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err)
    })
})


app.get('/reviews/meta', (req, res) => {
  pool.query( meta, [req.query.product_id] )
    .then((data) => {
      console.log('data>>', data.rows[0].data)
      res.send(data.rows[0].data);
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  pool.query( markHelpful, [req.params.review_id])
    .then(() => {
      res.send('helpfulness increased')
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put('/reviews/:review_id/report', (req, res) => {
  pool.query( markReported, [req.params.review_id])
    .then(() => {
      res.send('reported set to true')
    })
    .catch((err) => {
      console.log(err)
    })
})


app.listen(PORT, (err) => {
  if (err) {
    console.log('NOT connected');
  } else {
    console.log(`connected to ${PORT}`);
  }
});