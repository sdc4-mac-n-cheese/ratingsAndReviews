const { Client } = require('pg')
const client = new Client()

client.connect()

const getReviews = function(product_id) {
  client.query(`SELECT * FROM review WHERE product_id=${product_id}`, (err, res) => {
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log(res);
    // }
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  })
};