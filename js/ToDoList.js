var app = angular.module("ToDoList", []);

app.controller("ToDoCtrl", function($scope) {
 // $scope.items = [];
 // localStorage.setItem("todos", JSON.stringify($scope.items));
  $scope.items = angular.fromJson(localStorage.getItem("todos"));
  // $scope.items = [
//	{$$hashkey: 'object:2', task:'Study for test', complete: 'true'},
//	{$$hashkey: 'object:3',task:'Super Mario Bros', complete: 'false'}
//]
  console.dir($scope.items);
  if(!$scope.items) {
	$scope.items = [];
  }
//
  $scope.input = "";
	
  $scope.swapStatus = function($id) {
	
	var task = angular.element( $( 'li#task'+$id+' p' ) );
	console.dir(task[0].innerHTML);
	
	if($scope.items[$id].complete == 'true') {
		task.removeClass("done");
		$scope.items[$id].complete = 'false';
		
	} else {
		task.addClass("done");
		$scope.items[$id].complete = 'true';
	}
	
	localStorage.setItem("todos", JSON.stringify($scope.items));
	console.dir($scope.items);
  }
  
  $scope.addTask = function() {
	$scope.items.unshift({task:$scope.input, complete: 'false'});
	localStorage.setItem("todos", JSON.stringify($scope.items));
	$scope.input = "";
  }  
  
  $scope.removeTask = function($id) {
	$scope.items.splice($id, 1);
	localStorage.setItem("todos", JSON.stringify($scope.items));
  }
});

updateListColor = function(x) {
	for(i=0; i<x; i++) {
		if(i%2) {
			$( '#task'+i ).css("background-color", "blue");
		}
	}
}