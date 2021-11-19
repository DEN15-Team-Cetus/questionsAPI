const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: 'matthewdowell',
  host: 'localhost',
  database: 'reviews',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

client.connect()


const getReviews = (req, callback) => {
  console.log(req.query);

  const { page, count, sort, product_id } = req.query;
  var queryStr = `SELECT *, 
                   (
                    SELECT coalesce (json_agg(json_build_object('id', id, 'url', url)), '[]'::json) AS Photos FROM reviews_photos WHERE review_id = reviews.review_id                  
                   ) 
                 FROM reviews WHERE product_id = ${product_id}
                 LIMIT ${count || 5}`;
    client.query(queryStr, (err, results) => {
      console.log(results);
      callback(err, {
        product: product_id,
        page: page || 1,
        count: count || 5,
        results: results.rows
      });
    })
}

const getMetaData = (callback) => {

}

const postReview = (callback) => {

}

const markReviewAsHelpful = (callback) => {

}

const reportReview = (callback) => {

}

module.exports = {
  getReviews,
  getMetaData,
  postReview,
  markReviewAsHelpful,
  reportReview
}

