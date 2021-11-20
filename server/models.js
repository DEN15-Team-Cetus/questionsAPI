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
  var sortby = 'date';
  if (sort === 'newest') { sortby = 'date'; };
  if (sort === 'helpful') { sortby = 'helpfulness'; };
  if (sort === 'relevant') { sortby = 'helpfulness'; };
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
                 ORDER BY ${sortby} DESC
                 OFFSET $2
                 LIMIT $3`;
  client.query(queryStr, [product_id, offset, count], (err, results) => {
    callback(err, results);
  })
}

const getMetaData = ({ product_id }, callback) => {
  var queryStr = `SELECT * FROM characteristics WHERE product_id = $1 LIMIT 5`;
  client
    .query(queryStr, [product_id])
    .then(res => { callback(null, res); })
    .catch(err => console.error(err))
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

