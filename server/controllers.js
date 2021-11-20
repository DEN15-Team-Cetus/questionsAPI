const models = require('./models.js')

const handleReviewsGetRequest = (req, res) => {
  var { page, count, sort, product_id } = req.query;
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
  
};

const handlePostRequest = (req, res) => {
  
};

const handlePutToHelpful = (req, res) => {
  
};

const handlePutToReport = (req, res) => {
  
};

module.exports = {
  handleReviewsGetRequest,
  handleMetaGetRequest,
  handlePostRequest,
  handlePutToHelpful,
  handlePutToReport
}