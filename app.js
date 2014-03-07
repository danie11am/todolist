/**
 * This is the entry point of the node.js application.
 * 
 * The app is started by running
 * 
 * 		node app.js
 * 
 * This file does a few important bootstraping things:
 * - Include the dependencies.
 * - Specify important parameters such as the port to listen to.
 * - Defines handler functions for different REST-ful paths your clients can access.
 * 
 */

// Module dependencies.
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// This probably maps the public directory to serve static content.
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Map web request URL paths to handler files.

// This specifies the handler for "/" requests to be routes/index.js.
app.get('/', routes.index);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


