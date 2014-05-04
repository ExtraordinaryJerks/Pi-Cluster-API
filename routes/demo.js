//var Generator = require('../helpers/randomtext.js');

var mongoose = require('mongoose');
var Demo = mongoose.model('Demo');
var ServerStat = mongoose.model('ServerStat');
var OS = require('os');
var NET = require('net');

module.exports = DemoRoute;

function DemoRoute(){
}

DemoRoute.prototype = {
	create: function(request, response){
		
		var demo = new Demo();
		var serverstat = new ServerStat();

		demo.startDate = new Date();

		var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i <= request.params.size; i++ )
        {
        	code += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        demo._id = mongoose.Types.ObjectId();

		demo.data = code;

		demo.save(function(errordemo, returndemo){
			if(errordemo){
				response.writeHead(500, { 'Content-Type': 'application/json' });
            	response.write(JSON.stringify({isSuccessful:false,message:errordemo}));
            	response.end();
            	return;
			}

			console.log("Demo Saved!")

			serverstat.id = mongoose.Types.ObjectId();
			serverstat.demo_id = returndemo.id;
			serverstat.rss = process.memoryUsage().rss;
			serverstat.heapTotal = process.memoryUsage().heapTotal;
			serverstat.heapUsed = process.memoryUsage().heapUsed;
			serverstat.processId = process.getgid();
			serverstat.processTitle = process.title;
			serverstat.processUptime = process.uptime();
			serverstat.osHostName = OS.hostname();
			serverstat.osUptime = OS.uptime();
			//serverstat.LoadAverage = OS.loadavg();
			serverstat.osTotalMemory = OS.totalmem();
			serverstat.osFreeMemory = OS.freemem();
			serverstat.runName = request.params.runName;

			var interfaces = OS.networkInterfaces();
			var addresses = [];
			for (k in interfaces) {
			    for (k2 in interfaces[k]) {
			        var address = interfaces[k][k2];
			        if (address.family == 'IPv4' && !address.internal) {
			            serverstat.serverAddress = address.address;
			        }
			    }
			}

			demo.endDate = Date.now;

			serverstat.save(function(errorstat, returnstat){
					if(errorstat){
						return;
					}

					console.log(returnstat.serverAddress)

					return;
			});

            return;
		});

		response.writeHead(200, { 'Content-Type': 'application/json' });
    	response.write(JSON.stringify({isSuccessful:true}));
    	response.end();
    	return;

	},
	retrieve: function(request, response){

		console.log('Retrieve Demo!')

		var demo = new Demo();
		console.log("Create New Demo")
		var returnValue = '';

		demo.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, post) {
			console.log("Return found demo.")
  			returnValue = JSON.stringify(post);
		});

		console.log(returnValue);

		response.writeHead(200, { 'Content-Type': 'application/json' });
    	response.write(returnValue);
    	response.end();
    	return;	
	}
}