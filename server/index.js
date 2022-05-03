const axios = require ('axios')
const express = require ('express')
// const RR = require('./db/index.js')
const { reviews, meta, markHelpful, markReported, postreview } = require('./queries.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER1,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PGPORT,
  password: process.env.PASSWORD,
});

// pool.connect(() => {
//   console.log('db connected');
// })

// loaderio-4d0794fcf933758de3fc53ee604472b3


app.get('/', (req, res) => {
  res.send(`'process.env.USER1>>>', ${process.env.USER1}`)
})

app.get('/loaderio-03717fed6f2305235f6d227a0f9dd192', (req, res) => {
  res.send('loaderio-03717fed6f2305235f6d227a0f9dd192')
})


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
      res.status(500).send(err)
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
      res.status(500).send(err)
    })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  pool.query( markHelpful, [req.params.review_id])
    .then(() => {
      res.send('helpfulness increased')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.put('/reviews/:review_id/report', (req, res) => {
  pool.query( markReported, [req.params.review_id])
    .then(() => {
      res.send('reported set to true')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

app.post('/reviews', (req, res) => {
  pool.query( postreview, [
    req.query.product_id,
    req.query.rating,
    req.query.date,
    req.query.summary,
    req.query.body,
    req.query.recommend,
    req.query.name,
    req.query.email,
  ])
    .then(() => {
      res.send('review submitted')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})


app.listen(PORT, (err) => {
  if (err) {
    console.log('NOT connected');
  } else {
    console.log(`connected to ${PORT}`);
  }
});