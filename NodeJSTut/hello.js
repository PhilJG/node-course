// myModule.js

// function myFunction() {
//   console.log('Hello from myFunction!');
// }

// module.exports = myFunction;

// function myFunction() {
//   console.log('Hello from myFunction!');
// }

// function myFunction2() {
//   console.log('Hello from myFunction2!');
// }

// // First Export
// module.exports = myFunction;

// // Second Export
// module.exports = myFunction2;

function myFunction1() {
  console.log('Hello from myFunction1!');
}

function myFunction2() {
  console.log('Hello from myFunction2!');
}

module.exports = {
  foo: 'bar',
  myFunction1: myFunction1,
  myFunction2: myFunction2,
};
