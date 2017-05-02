var jwt = require('jsonwebtoken');
//wrapper for jwt that verify the jwt
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({secret: config.secrets.jwt});
var User = require('../api/user/userModel');

var logger = require('../util/logger');

exports.decodeToken = function(){
	return function(req, res, next){
		//make it optional to palce tooken on query string
		//if it is , place it on the headers where it should be 
		//so checkToken can see it. see  follow the 'Bearer dfjksjd' format
		//so checkToken can see it and decode it
		if(req.query && req.query.hasOwnProperty('access_token')){
			logger.log("ACCESS_TOKEN " +req.query.access_token);
			req.headers.authorization = 'Bearer ' + req.query.access_token;
		}
		//this will call next if token is valid 
		//and send error if its not. It will attached
		//the decoded token to req.user
		checkToken(req, res, next);
	};
}

exports.getFreshUser = function(){
	return function(req, res, next){
		User.findById(req.user._id)
			.then(function(user){
				if(!user){
					//if no user is found it was not 
					//it was a valid JWT but didn't decode
					//to a real user in out DB. Either the user was deleted
					//seince the client got the JWT, or 
					//it was a JWT from some other source
					res.status(401).send('Unauthorized');
				}else{
					//update req.user with fresh user from 
					//stale token data
					req.user = user;
					next();
				}
			}, function(err){
				next(err);
			});
	}
};

exports.verifyUser = function(){
	return function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;

		logger.log("Verifying user......");

		//if no username or password then send
		if(!username || !password){
			res.status(400).send('You need a username and password');
			return;
		}

		//look user up in the DB soo we can check
		//if the password match for the user

		User.findOne({username: username})
			.then(function(user){
				if(!user){
					res.status(401).send('No user with the given username');
				}else{
					logger.log("User found:: " + user)
					//checking the passwords here
					if(!user.authenticate(password)){
						logger.log("Wrong password:: "+ password);
						res.status(401).send('Wrong password');
					}else{
						logger.log("Password matched");
						//if everything is good,
						//then attach to req.user
						//and call next so the controller
						//can sign a token from the req.user._id
						req.user = user;
						next();
					}
				}
			}, function(err){
				next(err);
			});
	}
}

//util method to sign tokes on singup
exports.signToken = function(id){
	return jwt.sign(
		{'_id':id},
		config.secrets.jwt,
		{expiresIn: config.expireTime}
	);
};