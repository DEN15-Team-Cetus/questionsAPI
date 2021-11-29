const models = require('./models.js')

const handleReviewsGetRequest = (req, res) => {
  var { page, count, sort, product_id } = req.query;
  count = count || 5;
  page = page || 1;

  models.getReviews(req, (err, results) => { 
    if (err) {
      console.error('Unable to retrieve reviews from the database: ', err);
      res.statusCode = 500;
      res.send(err);
    } else {
      results.rows.map(row => {
        row.date = new Date(Number(row.date));
      });
      res.json({
        product: product_id,
        page: page,
        count: count,
        results: results.rows
      });
    }
  });
};

const handleMetaGetRequest = (req, res) => {
  models.getMetaData(req.query, (err, results) => {
    if (err) {
      console.error('Unable to retrieve meta data from the database: ', err);
      res.statusCode = 500;
      res.send(err);
    } else {
      res.json(results.rows[0].json_build_object);
    }
  })
};

const handlePostRequest = (req, res) => {
  models.postReview(req.body, (err, results) => {
    if (err) {
      console.error('Unable to post review: ', err);
      res.statusCode = 500;
      res.send(err);
    } else {
      res.sendStatus(201);
    }
  })
};

const handlePutToHelpful = (req, res) => {
  models.markReviewAsHelpful(req.params.review_id, (err, results) => {
    if (err) {
      console.error('Unable to mark review as helpful: ', err);
      res.statusCode = 500;
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
};

const handlePutToReport = (req, res) => {
  models.reportReview(req.params.review_id, (err, results) => {
    if (err) {
      console.error('Unable to report review: ', err);
      res.statusCode = 500;
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  })
};

module.exports = {
  handleReviewsGetRequest,
  handleMetaGetRequest,
  handlePostRequest,
  handlePutToHelpful,
  handlePutToReport
}