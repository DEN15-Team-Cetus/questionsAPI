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


const getReviews = (callback) => {
  var queryStr = 'SELECT * FROM reviews LIMIT 3';
    client.query(queryStr, (err, results) => {
      callback(err, results);
    });
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

