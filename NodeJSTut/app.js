// // __dirname Global Variable
// console.log(__dirname);

// // __filename Global Variable
// console.log(__filename);

// // Define a global variable in NodeJS
// global.myVariable = 'Hello World';

// // Access the global variable
// console.log(myVariable); // Output: Hello World

// app.js

// const myFunction = require('./hello.js');

// myFunction(); // logs 'Hello from myFunction!'

// const myModule = require('./hello');

// console.log(myModule.foo); // logs 'bar'
// myModule.myFunction1(); // logs 'Hello from myFunction1!'
// myModule.myFunction2(); // logs 'Hello from myFunction2!'

//OS module

// const os = require('os');

// // os.uptime()
// const systemUptime = os.uptime();

// // os.userInfo()
// const userInfo = os.userInfo();

// // We will store some other information about my WindowsOS in this object:
// const otherInfo = {
//   name: os.type(),
//   release: os.release(),
//   totalMem: os.totalmem(),
//   freeMem: os.freemem(),
// };

// // Let's Check The Results:
// console.log(systemUptime);
// console.log(userInfo);
// console.log(otherInfo);

// Import 'path' module using the 'require()' method:
// const path = require('path');

// // Assigning a path to the myPath variable
// const myPath = '/mnt/c/Desktop/NodeJSTut/app.js';

// const pathInfo = {
//   fileName: path.basename(myPath),
//   folderName: path.dirname(myPath),
//   fileExtension: path.extname(myPath),
//   absoluteOrNot: path.isAbsolute(myPath),
//   detailInfo: path.parse(myPath),
// };

// // Let's See The Results:
// console.log(pathInfo);

// const fs = require('fs');

// const data = '5) Hi, this is newFile.txt';

// fs.writeFile('./newFile.txt', data, { flag: 'a' }, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log('3) Written to file');
//   }
// });

// const fs = require('fs');

// fs.readdir('./txt', (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Directory read successful');
//   console.log(files);
// });

// fs.rename('./txt/newFile.txt', './txt/newerFile.txt', (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Directory rewrote successful');
//   console.log(files);
// });

// fs.unlink('./txt/newerFile.txt', (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Directory removed successful');
//   console.log(files);
// });

// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

// const welcomeUser = () => {
//   console.log('Welcome to server');
// };

// //Listening
// myEmitter.on('userJoined', welcomeUser);

// myEmitter.emit('userJoined');

//Listener funtions
// const sayHello = () => {
//   console.log('Hello User');
// };
// const sayHi = () => {
//   console.log('Hi User');
// };
// const greetNewYear = () => {
//   console.log('Happy New Year');
// };

// //Subscribing to 'userJoined' event
// myEmitter.on('userJoined', sayHello);
// myEmitter.on('userJoined', sayHi);
// myEmitter.on('userJoined', greetNewYear);

// //Emitting the 'userJoined' event
// myEmitter.emit('userJoined');

// //Listener function
// const greetBirthday = (name, newAge) => {
//   console.log(`Happy Birthday ${name}. you are now ${newAge}`);
// };

// //Listening for the birthdayEvent
// myEmitter.on('birthdayEvent', greetBirthday);

// //Emitting the birthday event with extra parameters
// myEmitter.emit('birthdayEvent', 'John', '24');

// myEmitter.on('userJoined', sayHi);

// myEmitter.emit('userJoined');

// myEmitter.on('userJoined', sayHello);

// const http = require('http');

// const server = http.createServer((request, response) => {
//   if (request.url === '/') {
//     response.writeHead(200, { 'content-type': 'text/html' });
//     response.write('<h1>Home Page</h1>');
//     response.end();
//   } else if (request.url === '/about') {
//     response.writeHead(404, { 'content-type': 'text/html' });
//     response.write('<h1>About Page</h1>');
//     response.end();
//   } else if (request.url === '/contact') {
//     response.writeHead(200, { 'content-type': 'text/html' });
//     response.write('<h1>Contact Page</h1>');
//     response.end();
//   } else {
//     response.writeHead(404, { 'content-type': 'text/html' });
//     response.write(
//       '<h1 style="color: blue">404 motha fucka</h1> <a href="/" >Go back meow</a>'
//     );
//     response.end();
//   }
// });

// server.listen(5000, () => {
//   console.log(`Server listening at port ${5000}`);
// });

const http = require('http');
const fs = require('fs');
const path = require('path'); //Added path module to handle file paths

//Get content of HTML CSS, JS
//Note that we are going to serve the contents of the file and not the file itself. So readFileSync() comes into picture.
const homePage = fs.readFileSync('./navbar-app/index.html');
const homeLogo = fs.readFileSync('./navbar-app/logo.svg');
// const homeStyles = fs.readFileSync('./navbar-app/style.css');
// const homeLogic = fs.readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((request, response) => {
  const static = path.join(__dirname, 'navbar-app');

  if (request.url === '/') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.write(homePage);
    response.end();
  } else if (request.url.startsWith('/')) {
    // Check if the request starts with '/'
    // Read the file from the static directory and the request url
    fs.readFile(path.join(static, request.url), (err, data) => {
      if (err) {
        response.writeHead(404);
        response.end();
      } else {
        //determine the content type
        let contentType;
        if (request.url.endsWith('.css')) {
          contentType = 'text/css';
        } else if (request.url.endsWith('.js')) {
          contentType = 'text/javascript';
        } else if (request.url.endsWith('.svg')) {
          contentType = 'image/svg+xml';
        }
        response.writeHead(200, { 'content-type': contentType });
        response.end(data);
      }
    });
  } else if (request.url === '/contact') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.write('<h1>Contact Page</h1>');
    response.end();
  } else if (request.url === '/about') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.write('<h1>about Page</h1>');
    response.end();
  } else {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.write(
      '<h1 style="color: blue">404 motha fucka</h1> <a href="/" >Go back meow</a>'
    );
    response.end();
  }
});

server.listen(5000, () => {
  console.log(`Server listening at port ${5000}`);
});

// } else if (request.url === '/style.css') {
//   response.writeHead(200, { 'content-type': 'text/css' });
//   response.write(homeStyles);
//   response.end();
// } else if (request.url === '/browser-app.js') {
//   response.writeHead(200, { 'content-type': 'text/javascript' });
//   response.write(homeLogic);
//   response.end();
// } else if (request.url === '/logo.svg') {
//   response.writeHead(200, { 'content-type': 'image/svg+xml' });
//   response.write(homeLogo);
//   response.end();
