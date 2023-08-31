const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

//A function which upon calling will add a bunch of methods to the app variable
const app = express();

//1) Middlewares

//middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) Route handlers /controllers

const getAllTours = (req, res) => {
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
const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deletTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  //500 means internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

//3) Routes

//Real middleware
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/ :id').get(getTour).patch(updateTour).delete(deletTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//Mounting new routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) Server
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
