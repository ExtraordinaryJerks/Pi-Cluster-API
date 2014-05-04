var mongoose = require('mongoose')
	, Schema = mongoose.Schema

var ServerStatSchema = new Schema({
	  demo_id : Schema.Types.ObjectId
	, creationDate: {type: Date, default: Date.now}
	, rss: Number
	, heapTotal: Number
	, heapUsed: Number
	, processId: String
	, processTitle: String
	, processUptime: Number	
	, osHostName: String
	, osUptime: Number
	//, osLoadAverage:[]
	, osTotalMemory: Number
	, osFreeMemory: Number
	, serverConnections: Number
	, serverBytesRead: Number
	, serverBytesWritten: Number
	, serverAddress: String
	, serverPort: String	
});

module.exports = mongoose.model('ServerStat', ServerStatSchema);