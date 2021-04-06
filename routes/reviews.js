const express = require('express');
const path = require('path');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const { createReview, deleteReview } = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
// const Joi = require('joi')
const { reviewSchema } = require('../schemas.js');
const Review = require('../models/review');

router.post('/', validateReview, isLoggedIn, catchAsync(createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteReview));

module.exports = router;