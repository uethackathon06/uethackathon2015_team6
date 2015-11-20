'use strict';

// Setting up route
angular.module('contests').config(['$stateProvider',
  function ($stateProvider) {
    // contests state routing
    $stateProvider
      .state('createContest', {
        url: '/create',
        templateUrl: 'modules/contests/client/views/create-contest.client.view.html'
      })
      .state('listContest', {
        url: '/list',
        templateUrl: 'modules/contests/client/views/list-contest.client.view.html'
      });
  }
]);
