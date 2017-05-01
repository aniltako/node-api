var express = require('express');
var router = require('express').Router();
var app = express();
var api = require('./api/api');

var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost/aamshi', function (error) {
    if (error) {
        console.log(error);
    }
});

//set up the app middleware
require('./middleware/appMiddleware')(app);

var homeRouter = router.get('/', function(req, res, next){
	res.render('index', {title: 'cool, huh!', condition: false});
});

app.use('/', homeRouter);


//setup the api
app.use('/api', api);


//set up global error handling

//export the app for testing
module.exports = app;