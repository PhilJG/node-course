const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    //give users the amount of results if there are multiple objects
    results: tours.length,
    data: { tours: tours },
  });
};

//Will pull up a single tour based on the id
exports.getTour = (req, res) => {
  //req.params where all variables & parameters are stored
  console.log(req.params);
  //convert string to a number
  const id = req.params.id * 1;
  //.find() loop through array an return T of F operations and only return true element ids
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    //give users the amount of results if there are multiple objects
    results: tours.length,
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  //.assign() merges new and existing objects together
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  //Don`t use writeFileSync because it is syncronous and blocking
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated/>',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
