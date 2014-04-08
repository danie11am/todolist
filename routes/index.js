/*
* Functions in the backends that handle web requests.
*
* The mapping between request URLs and these functions are done in the main node app script, i.e. todolist.js.
*/



/**
 * Return a function that renders the index page.
 *
 * @param {Object} Todo - Data model of a To-do item.
 * @param {Object} urlPathBackend - URL path of the site.
 */
exports.index = function(Todo, urlPathBackend) {
  return function(req, res) {
    
    // Query the MongoDB using Todo data model object.
    //
    // find() is provided by Mongoose to query database.
    // 
    // 1st argument {} means there is no search criteria.
    // 2nd argument is a function that will be executed when result set returns. 
    Todo.find({}, function(error, todosParam) {

      // This will create a response using /views/index.jade.
      // "/views/" because it's an ExpressJS convention. ".jade" because Jade has been set as View engine in todolist.js.
      res.render('index', {
        pageTitle: 'To-do List',
        todosBackend: todosParam,
        urlPath: urlPathBackend
      });
    });
  };
};



/**
 * Return a function that handles requests to save a new todo item.
 *
 * @param {Object} Todo - Data model of a To-do item.
 */
exports.addTodo = function(Todo) {
  return function(req, res) {

    // Create a new todo item using data model, based on content of the request.
    var todo = new Todo(req.body);

    // Save the todo item persistently.
    todo.save(function(error, todo) {

      if (error || !todo) {
        
        // If save action had an error, or resultant todo item is null, return the error details as a json object.
        res.json({
          error : error
        });

      } else {

        // Otherwise the save action was successful. Return the created todo item as a json object.
        res.json({
          todo : todo
        });
      }
    });
  };
};



/**
 * Return a function that handles requests to get all todo items.
 * 
 * @param {Object} Todo
 */
exports.get = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todosResultSet) {
      res.json({
        todos : todosResultSet
      });
    });
  };
};



/**
 * Return a function that handles requests to update a todo item.
 * 
 * @param {Object} Todo
 */
exports.update = function(Todo) {
  return function(req, res) {
    Todo.findOne({
      _id : req.params.id
    }, function(error, todo) {
      if (error || !todo) {
        res.json({
          error : error
        });
      } else {
        todo.done = req.body.done;
        todo.save(function(error, todo) {
          if (error || !todo) {
            res.json({
              error : error
            });
          } else {
            res.json({
              todo : todo
            });
          }
        });
      }
    });
  };
};
