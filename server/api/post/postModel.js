var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: {
		type: String,
		require: true,
		unique: true
	},
	text: String,
	//array of ids from the users
	author: {
		type:Schema.Types.ObjectId,
		ref:'user',
		require: true
	},
	categories:[
		{
			type: Schema.Types.ObjectId, ref: 'category'
		}
	]
});

module.exports = mongoose.model('post', PostSchema);