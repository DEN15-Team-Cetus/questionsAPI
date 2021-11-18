const models = require('./models.js')

const handleReviewsGetRequest = (req, res) => {
  models.getReviews((err, results) => {
    if (err) {
      console.error('Unable to retrieve reviews from the database: ', err);
      res.sendStatus(500);
    } else {
      res.json(results);
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