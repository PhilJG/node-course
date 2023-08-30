const EventsEmitter = require('events');
const http = require('http');

class Sales extends EventsEmitter {
  //constructor is a function that is called as soon as a new function is called from a new class
  constructor() {
    //super gets access to all methods of the parent class
    super();
  }
}

const myEmitter = new Sales();

//observer
myEmitter.on('newSale', () => {
  console.log('There was a new sale');
});

//observer
myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

//emitter
myEmitter.emit('newSale', 9);

///////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request recieved');
  console.log(req.url);
  res.end('Request recieved');
});

server.on('request', (req, res) => {
  res.end('Another request');
});

server.on('close', () => {
  console.log('server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});
