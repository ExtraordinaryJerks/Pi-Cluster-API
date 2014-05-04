
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Demo = require('./model/demo.js');
var ServerStat = require('./model/serverstat.js');
var DemoRoute = new require('./routes/demo')
var ModelContext = require('./domain/modelcontext.js')
var seaport = require('seaport');
var ports = seaport.connect('192.168.1.254', 9090);

var routes = require('./routes');

var app = express();

var mongoConnectionString = 'mongodb://localhost:27017/picluster';
//var mongoConnectionString = 'mongodb://192.168.1.246:27017/picluster';
new ModelContext(mongoConnectionString);

var demoroute = new DemoRoute();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/demo/:size/:runName', demoroute.create.bind(demoroute))
app.get('/demo', demoroute.retrieve.bind(demoroute))


//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//http.createServer(app).listen(ports.register('pi-server'));
