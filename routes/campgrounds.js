const express = require('express');
const path = require('path');
const router = express.Router({ mergeParams: true });
const { index, newCampground, createCampground, showCampground, editCampround, updateCampground, deleteCampground } = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Joi = require('joi');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.get('/', catchAsync(index))

router.get('/new', isLoggedIn, newCampground)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground))


router.get('/:id', isLoggedIn, catchAsync(showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(editCampround))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(deleteCampground))

module.exports = router;