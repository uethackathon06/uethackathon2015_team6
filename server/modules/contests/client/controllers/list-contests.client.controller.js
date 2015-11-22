'use strict';

// contests controller
angular.module('contests').controller('listContestsController', ['$scope', '$timeout', '$location', '$http', 'Authentication',
  function ($scope, $timeout, $location, $http, Authentication) {
    $scope.authentication = Authentication;
    $scope.contests = [];
    //console.log($scope.authentication);

    $scope.isAdmin = $.inArray('admin', Authentication.user.roles) > -1;

    $scope.find = function(){
    	console.log(11);
	    $http.get('/contest/list').success(function(response){
	    	$timeout(function() {
	            $scope.contests = response;
	        }, 100);     
	    });	
    }

    $scope.del = function(index){
      //console.log(index);
      var id = $scope.contests[index]._id;
      $scope.contests.splice(index,1);
      $http.post('contest/remove',{id: id})
      .success(function(response){
        console.log(response);
      })
    }
    
    
  }
]);
