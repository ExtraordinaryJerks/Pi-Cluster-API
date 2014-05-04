var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var Demo = new Schema({
	  data : String
	, creationDate: {type: Date, default: Date.now}
	, startDate: Date
});

module.exports = mongoose.model('Demo', Demo);