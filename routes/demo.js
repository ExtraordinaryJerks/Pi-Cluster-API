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
        for( var i=0; i <= 10000; i++ )
        {
        	code += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        demo._id = mongoose.Types.ObjectId();
		demo.data = code;

		demo.save(function(errordemo, returndemo){
			if(errordemo){
				//response.writeHead(500, { 'Content-Type': 'application/json' });
            	//response.write(JSON.stringify({isSuccessful:false,message:err.message}));
            	//response.end();
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

		//console.log("Create Route!");
		response.end();

	},
	retrieve: function(request, response){

/*		var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i <= 10000; i++ )
            {
            	code += possible.charAt(Math.floor(Math.random() * possible.length));
            }*/
            response.end();
        //return code;

		
	}
}