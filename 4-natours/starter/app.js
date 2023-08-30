const fs = require('fs');
const express = require('express');

//A function which upon calling will add a bunch of methods to the app variable
const app = express();

//middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours');

//Will pull up a single tour based on the id
app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
