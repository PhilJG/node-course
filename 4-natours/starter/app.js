const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

//3) Routes
//Mounting new routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
