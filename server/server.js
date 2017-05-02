var config = require('./config/config');
var express = require('express');
var router = require('express').Router();
var app = express();
var api = require('./api/api');
var auth = require('./auth/routes');
var logger = require('./util/logger');

var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect(config.db.url, function (error) {
    if (error) {
        console.log(error);
    }
});

//set up the app middleware
require('./middleware/appMiddleware')(app);

if(config.seed){
	require('./util/seed');
}

var user = {
	contact: {
		email: 'hi@azat.co',
		twitter: 'azat_co'
	},
	address: {
		city: 'San Francisco',
		state: 'California'
	},

	name: 'Azat'
	
}

var homeRouter = router.get('/', function(req, res, next){
	res.render('index', {title: 'cool, huh!', condition: false, number: [1,2,3,4], user: user});
});

//routes for views
app.use('/', homeRouter);


//setup the api
app.use('/api', api);
app.use('/auth', auth);


//set up global error handling

//export the app for testing

app.use(function(err, req, res, next){
	//if error thrown from jwt validation
	if(err.name === 'UnauthorizedError'){
		res.status(401).send('Invalid token');
		return;
	}

	logger.log(err.stack);
	res.status(500).send('Oops');
});

module.exports = app;