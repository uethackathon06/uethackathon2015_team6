'use strict';

// contests controller
angular.module('contests').controller('listContestsController', ['$scope', '$timeout', '$location', '$http', 'Authentication',
  function ($scope, $timeout, $location, $http, Authentication) {
    $scope.authentication = Authentication;
    $scope.contests = [];
    //console.log($scope.authentication);

    $scope.isAdmin = $.inArray('admin', Authentication.user.roles) > -1;

    $scope.genText = function(response){
      var date = new Date().getTime(),
          dateStart = new Date(response.dateStart).getTime(),
          dateEnd = new Date(response.dateEnd).getTime();
      if (date < dateStart)
        return {
          text: 'start at ' + new Date(response.dateStart).toUTCString(),
          status: '#64dd17'
        }
      else if (date > dateEnd)
        return {
          text: 'contest ended',
          status: '#f44336'
        }
      else  
        return {
          text: 'end at ' + new Date(response.dateEnd).toUTCString(),
          status: '#2979ff'
        };
    }

    $scope.find = function(){
	    $http.get('/contest/list').success(function(response){
	    	$timeout(function() {
	            $scope.contests = response;
              
              $scope.dateTip = [];
              for(var i = 0; i < response.length; i++){
                if (response[i].setTime){
                  $scope.dateTip.push($scope.genText(response[i]));
                } else
                  $scope.dateTip.push({status: ''});
              }
          
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
