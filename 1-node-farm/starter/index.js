//fs = file system.acces to functions for reading and writing date to the file system
const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
const { toUnicode } = require('punycode');

/////////////
///Files

// //utf-8 is character encoding in english
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
// const textOut = `This is what weknow about the avocado: ${textIn}. \nCreated on ${Date.now()}`
// fs.writeFileSync(`./txt/output.txt`, textOut)
// console.log('File written');

//Non-blockin, asynchronous
//First callback is typically the error
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, err => {
//                 console.log('File has been written');

//             })
//         })
//     })
// })
// console.log('Will read file!');

/////////////////////////////
////// SERVER

//Can be syncoronous because in top level code and only needs to be called once

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   'utf-8'
// );
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   'utf-8'
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   'utf-8'
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //true passes query into an object
  //{destructuring} will pass the two property names of this object
  // const { query, pathname } = url.parse(req.url, true);

  const pathname = req.url;

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.end('Overview');
    //Product Page
  } else if (pathname === '/product') {
    res.end('Product');
    //API
    // } else if (pathname === '/api') {
    //   fs.readFile(`${__dirnam}/dev-data/data.json`, 'utf-8', (err, data) => {
    //     const productData = JSON.parse(dataObj);
    //     console.log(productData);
    //   });

    //   //Not found
    // }
  } else {
    //Headers and status code always need to be before sending out the response
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
