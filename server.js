//npm init -y for initialize the projects with package.json file. which stores metadata about your project and its dependencies.
//npm install for initialize all package.json listed dependencies package-lock.json and create node modules in your project
//npm install express //for creating basic Node.js web server,framework like Express in your project
//npm install nodemon --save-dev  //refresh every modified code

let express = require('express');
let app = express();

const bodyParser = require('body-parser');
const axios = require('axios');
const doteenv = require('dotenv').config();

const session = require('express-session');
app.use(session({
    secret: 'some secret',
    cookies: 'maxAge: 30000',
    resave: false,
    saveUninitialized: true,
})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static('public'));
app.set('view engine', 'ejs');


const mongoose = require('mongoose');
const config = require('./config/db'); // Adjust the path accordingly


// Connect to MongoDB Atlas Database
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB Connected')).catch((err) => console.error('Error connecting to MongoDB:', err));

// Your other server setup and routes go here...
app.use('/', require('./routes/userRoute'));
app.use('/product', require('./routes/productRoute'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Successfully Connected');
    console.log(`http://localhost:${port}/`);
});




