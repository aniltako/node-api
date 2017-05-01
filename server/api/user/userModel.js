var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	
	username:{
		type: String,
		require: true,
		unique: true
	}
});

module.exports = mongoose.model('user', UserSchema);