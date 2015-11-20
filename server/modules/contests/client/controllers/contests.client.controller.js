'use strict';

// contests controller
angular.module('contests').controller('contestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'contests',
  function ($scope, $stateParams, $location, Authentication, contests) {
    $scope.authentication = Authentication;

    // Create new Contest
    /*$scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'contestForm');

        return false;
      }

      // Create new Contest object
      var contest = new Contests({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      contest.$save(function (response) {
        $location.path('contests/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Contest
    $scope.remove = function (contest) {
      if (contest) {
        contest.$remove();

        for (var i in $scope.contests) {
          if ($scope.contests[i] === contest) {
            $scope.contests.splice(i, 1);
          }
        }
      } else {
        $scope.contest.$remove(function () {
          $location.path('contests');
        });
      }
    };

    // Update existing Contest
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'contestForm');

        return false;
      }

      var contest = $scope.contest;

      contest.$update(function () {
        $location.path('contests/' + contest._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of contests
    $scope.find = function () {
      $scope.contests = contests.query();
    };

    // Find existing Contest
    $scope.findOne = function () {
      $scope.contest = contests.get({
        contestId: $stateParams.contestId
      });
    };*/
  }
]);
