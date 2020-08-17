// app.js

var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./routes/auth'); // Imports routes for the auth
var user = require('./routes/user'); // Imports routes for the users
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/trackitnow_assignment_dev';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// for cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/auth', auth);//any routes that prefix with /auth go into auth routes
app.use('/users', user);//any routes that prefix with /user go into user routes

var port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
