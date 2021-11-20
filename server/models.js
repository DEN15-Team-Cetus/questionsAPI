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
  var { page, count, sort, product_id } = req.query;
  count = count || 5;
  page = page || 1;
  const offset = page * count - count;
  var queryStr = `SELECT *, 
                   (
                    SELECT 
                      coalesce (json_agg(json_build_object('id', id, 'url', url)), '[]'::json) 
                    AS Photos FROM reviews_photos WHERE review_id = reviews.review_id                  
                   ) 
                 FROM reviews WHERE product_id = $1
                 OFFSET $3
                 LIMIT $2`;
    client.query(queryStr, [product_id, count, offset], (err, results) => {
      callback(err, {
        product: product_id,
        page: page,
        count: count,
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

