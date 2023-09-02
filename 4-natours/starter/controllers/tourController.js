const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    //make sure after response has been sent then the function will return and never call next()
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// Create a checkBody middleware
exports.checkBody = (req, res, next) => {
  // Check if body contains the name and price property
  if (!req.body.name || !req.body.price) {
    // If not, send back 400 (bad request)
    return res.status(400).json({
      status: 'Fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// exports.checkBody = (req, res, next, val) => {
//   console.log(`price is ${val}`);

//   if (req.params.price != tours.price) {
//     console.log('price not found');

//     res.status(404).json({
//       status: 'fail',
//       message: 'No price',
//     });
//   } else {
//     console.log(`price is ${val}`);

//     // res.status(200).json({
//     //   status: 'price found',
//     // });
//   }
//   next();
// };

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
  // if (id > tours.length)

  res.status(200).json({
    status: 'success',
    //give users the amount of results if there are multiple objects
    results: tours.length,
    data: { tour },
  });
};

exports.createTour = (req, res) => {
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
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated/>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
