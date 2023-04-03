const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utilis/catchAsync');
const { isLoggedIn, isAuthor, isCampground, validateCampground } = require('../middleware');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))



router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(isCampground, catchAsync(campgrounds.showCampground))
    .put(isCampground, isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isCampground, isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isCampground, isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));



module.exports = router;