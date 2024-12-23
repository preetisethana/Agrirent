const express = require('express');
const router = express.Router();
const {getReviews, getReview, createReview, updateReview, deleteReview} = require('../controllers/reviewController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getReviews);
router.get('/', getReview);
router.post('/', createReview);
router.put('/', updateReview);
router.delete('/', deleteReview);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { getReviews, getReview, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
// const validateToken = require('../middleware/validateTokenHandler');

// router.use(validateToken);

// router.get('/all', getReviews); // Fetch all reviews for a machine
// router.get('/', getReview); // Fetch a review by booking ID
// router.post('/', createReview); // Create a new review
// router.put('/:reviewId', updateReview); // Update an existing review
// router.delete('/:reviewId', deleteReview); // Delete a review

// module.exports = router;
