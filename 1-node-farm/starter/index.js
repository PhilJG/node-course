//fs = file system.acces to functions for reading and writing date to the file system
const fs = require('fs');
const http = require('http');
const url = require('url');

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
const replaceTemplate = (temp, product) => {
    // wrapping /.../g will make it global so all elements will be wrapped in these placeholders
    //replaceAll product name with temp because it is not good practice to directly maniumplate arguements hence let 
    let output = temp.replaceAll(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replaceAll(/{%IMAGE%}/g, product.image)
    output = output.replaceAll(/{%PRICE%}/g, product.price)
    output = output.replaceAll(/{%FROM%}/g, product.from)
    output = output.replaceAll(/{%QUANTITY%}/g, product.quantity)
    output = output.replaceAll(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replaceAll(/{%DESCRIPTION%}/g, product.description)
    output = output.replaceAll(/{%ID%}/g, product.id)

    if (!product.organic) output = output.replaceAll(/{%NOT_ORGANIC%}/g, 'not-organic')
    return output
}

//Can be syncoronous because in top level code and only needs to be called once

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    //true passes query into an object
    //{destructuring} will pass the two property names of this object
    const { query, pathname } = url.parse(req.url, true);

    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        //join('') will join all elements into a string
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS', cardsHtml)
        res.end(output);

        //Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output)

        //API
    } else if (pathname === '/api') {
        //tel the browser we are sending by json
        res.writeHead(200, { 'Content-type': 'application/json' })
        //This data now comes from top level code
        res.end(data)

        //Not found
    } else {
        //Headers and status code always need to be before sending out the response
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
})