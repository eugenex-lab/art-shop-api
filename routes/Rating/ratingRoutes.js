const express = require("express");
const {ratingCreateController} = require("../../controllers/Rating/RatingController");
const {ratingController} = require("../../controllers/Rating/RatingController");
const {ratingsController} = require("../../controllers/Rating/RatingController");
const {ratingDelController} = require("../../controllers/Rating/RatingController");
const {ratingUpdateController} = require("../../controllers/Rating/RatingController");


const ratingRouter = express.Router();

// create users /api/v1/rating/register

ratingRouter.post('/',ratingCreateController);


// get single user /api/v1/rating/profile/:id
ratingRouter.get('/:id', ratingController
);

// get users /api/v1/rating
ratingRouter.get('/', ratingsController);

// del rating
ratingRouter.delete('/:id', ratingDelController);

// update rating
ratingRouter.put('/:id', ratingUpdateController);


module.exports = ratingRouter;