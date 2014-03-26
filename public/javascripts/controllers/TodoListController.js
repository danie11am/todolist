/*
 * Controller class included in index.jade to serve frontend needs. 
 * 
 * This is included in the header of index.jade and also specified as an AngularJS controller using the 
 * "ng-controller" attribute.
 * 
 * This is an AngularJS feature/convention.
 * 
 * The arguments to the constructor are set automatically by AnguarlJS. This feature is known as 
 * "dependency injection". Here is a succint explanation from stackoverflow 
 * (http://stackoverflow.com/questions/130794/what-is-dependency-injection ) on what that means:
 * 
 * "Basically, instead of having your objects creating a dependency or asking a factory object to make one for them, 
 * you pass the needed dependencies in to the constructor or via property setters, and you make it somebody else's 
 * problem"
 *  
 */
function TodoListController($scope, $http, $timeout) {
	
  // Initialise to-do item list to be empty. 
  $scope.todos = [];
  
  // Initialise a new to-do item.
  $scope.newTodo = {
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : ''
  };

  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };


  // Set up various functions that will be used by front-end during run-time.


  // Create the function to set up the to-do items that will be available for page to display/use.
  // Called during initialisation of AngularJS, as specified in ng-init attribute in index.jade.
  // The todosParam come from backend.
  $scope.setTodos = function(todosParam) {
    $scope.todos = todosParam;
  };


  // Create the function to update a todo item.
  // Called when the "complete" checkbox of todo item is checked or unchecked. 
  $scope.update = function(todo) {
  	
  	// Send a HTTP PUT request to backend to update todo item.
    $http.put('/examples/todolist/examples/todolist/todo/' + todo._id + '.json', todo).success(function(data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };


  // Refresh the to-do list by sending a GET request to retrieve the latest to-do items. 
  // Called from within this class itself below, using a timer.
  $scope.updateList = function() {

  	// Send a HTTP GET request to backend to get list of todo items.
    $http.get('/examples/todolist/todos.json').success(function(data) {
    	
      // If new todo list is returned successfully from backend then overwrite current frontend todos with it. 
      $scope.todos = data.todos;
    });

    // Keep refreshing by calling itself every so often.
    $timeout(function() {
      $scope.updateList();
    }, 30 * 60 * 1000); // update every 30 minutes;
  };


  // Initiate the refresh cycle.
  // TODO - The 2 timers seem to have doubled up?
  $timeout(function() {
    $scope.updateList();
  }, 30 * 60 * 1000); // update every 30 minutes;


  // Refresh the list once at the beginning.
  // TODO - Is this actually needed? Looks like todos already got data. Looks like either this or the one timeout
  // call above is not needed.
  $scope.updateList();


  // Add a todo item.
  // Called when user submits a new todo item in the form.
  $scope.addNewTodo = function() {
  	
  	// Send a HTTP POST request to backend to add a new todo items.
    $http.post('/examples/todolist/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) {
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
      } else {
        alert(JSON.stringify(data));
      }
    });
  };
}