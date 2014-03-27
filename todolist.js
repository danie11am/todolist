/**
 * This is the starting point of the node.js application.
 * 
 * The app is started by running
 * 
 * 		node todolist.js
 * 
 * This file carries out a few important steps for bootstraping:
 * - Include the dependent modules.
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

// Create an instance of Express server.
var app = express();

var Mongoose = require('mongoose');

// Create a connection to "mytestapp" mongoDB database in localhost.
var db = Mongoose.createConnection('localhost', 'mytestapp');

var TodoSchema = require('./models/Todo.js').TodoSchema;
var TodoModel = db.model('todos', TodoSchema);

// Set default site path.
var urlPath = '/examples/todolist';

// Apply settings that are relevent to all environments.

app.set('port', process.env.PORT || 3000);

// Set the "views" path - who use it?
app.set('views', path.join(__dirname, 'views'));

// Use Jade as view engine.
// View engine renders UI pages, i.e. create the final HTML pages that will be sent to browsers.
// View engine is used in res.render() calls in index.js.
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Maps the public directory to serve static content.
app.use(express.static(path.join(__dirname, 'public')));

// Apply development environment-specific settings. 
if ('development' == app.get('env')) {

  app.use(express.errorHandler());
  
  // Overwrite URL path to use root path.
  urlPath = '';
}


// Map web request URL paths to handler files.

// Specifies handler for GET requests on "/" to be routes/index.js.
app.get('/', routes.index(TodoModel, urlPath));

app.get('/users', user.list);
app.post('/todo.json', routes.addTodo(TodoModel));
app.put('/todo/:id.json', routes.update(TodoModel));
app.post('/todo.json', routes.addTodo(TodoModel));


// Create HTTP server that starts listening to specified port.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


