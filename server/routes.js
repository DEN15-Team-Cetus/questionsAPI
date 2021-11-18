const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/', controller.handleReviewsGetRequest);

router.get('/meta', controller.handleMetaGetRequest);

router.post('/', controller.handlePostRequest);

router.put('/:review_id/helpful', controller.handlePutToHelpful);

router.put('/:review_id/report', controller.handlePutToReport);

module.exports = router;