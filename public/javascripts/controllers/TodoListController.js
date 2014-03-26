/*
 * Controller class used by index.jade to serve frontend needs. 
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
  $scope.todos = [];
  $scope.newTodo = {
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : ''
  };

  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function(todos) {
    $scope.todos = todos;
  };

  $scope.update = function(todo) {
    $http.put('/examples/todolist/todo/' + todo._id + '.json', todo).success(function(data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };

  $scope.updateList = function() {
    $http.get('/examples/todolist/todos.json').success(function(data) {
      $scope.todos = data.todos;
    });

    $timeout(function() {
      $scope.updateList();
    }, 30 * 60 * 1000); // update every 30 minutes;
  };

  $timeout(function() {
    $scope.updateList();
  }, 30 * 60 * 1000); // update every 30 minutes;

  $scope.updateList();


  $scope.addNewTodo = function() {
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