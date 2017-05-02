var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

var logger = require('../../util/logger');


exports.params = function(req, res, next, id){
	User.findById(id)
		.then(function(user){
			if(!user){
				next(new Error('No user with that id'));
			}else{
				req.user = user;
				next();
			}
		}, function(err){
			next(err);
		});
};

exports.get = function(req, res, next){
	User.find({})
		.then(function(users){
			res.json(users);
		}, function(err){
			next(err);
		});
};

exports.getOne = function(req, res, next){
	var user = req.user;
	res.json(user);
};

exports.put = function(req, res, next){
	var user = req.user;

	var update = req.body;

	_.merge(user, update);

	user.save(function(err, saved){
		if(err){
			next(err);
		}else{
			res.json(saved);
		}
	});
};

exports.post = function(req, res, next){
	var newUser = new User(req.body);

	newUser.save(function(err, user){
		if(err){
			next(err);
		}
		var token = signToken(user._id);
		res.json({token: token});
	});
};

exports.delete = function(req, res, next){
	req.user.remove(function(err, removed){
		if(err){
			next(err);
		}else{
			res.json(removed);
		}
	});
};

exports.checkDublicateUser = function(){
	return function(req, res, next){
		
		User.count({username: req.body.username})
			.then(function(count){
				if(count < 1){
					req.password = user.encryptPassword(req.password);
					logger.log("No dublicate user");
					next();
				}else{
					res.status(401).send('User name already exits. Please try another username');
				}
			}, function(err){
				next(err);
		});
	}
};

exports.me = function(req, res) {
  res.json(req.user);
};