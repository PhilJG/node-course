const express = require('express');
//equivelent to all exports. on tourController.js
const {
  checkID,
  getAllTours,
  checkBody,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController');

const router = express.Router();

//val holds the value of the id parameter
router.param('id', checkID);

// router.param('price', checkPrice);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(getAllTours)
  // Add it to the post handler stack
  //before createTour is called the checkBody middleware runs
  .post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
