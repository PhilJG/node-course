const dotenv = require('dotenv');

//read the variables from the file and save them into nodejs variables
//reading of files only happens once beccause they are in the node process environment
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
