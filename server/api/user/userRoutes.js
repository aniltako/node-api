var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var checkDublicateUser = require('./userController').checkDublicateUser;
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

// router.route('/')
// 	.get(function(req, res){
// 		logger.log('Hey from user');
// 		res.send({ok: true});
// 	});

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
	.get(controller.get)
	.post(controller.post)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.put)
	.delete(controller.delete)

module.exports = router;