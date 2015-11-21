'use strict';

// contests controller
angular.module('contests').controller('contestsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'contests',
  function ($scope, $stateParams, $location, $http, Authentication, contests) {
    $scope.authentication = Authentication;

    if ($location.path() == '/create'){
      $http.post('contest/create').success(function(response){
        $location.path('/edit/'+response._id);
      })
    }

    $scope.header = {
      id: "header",
      edit: true,
      text: ""  
    };
    $scope.questions = [];
    $scope.currentText = "";

    $scope.textSample = "";
    $scope.chr = [];

    for (var i = 0; i < 26; i++){
      $scope.chr.push(String.fromCharCode(65 + i));
    }
    
    $scope.init = function(){
      var id = $location.path().slice(6);
      console.log(id);
      $http.post('contest/find', {id: id}).success(function(response){
        $scope.contest = response[0];
        $scope.header.text = response[0].header;
        if (response[0].questions)
          $scope.questions = response[0].questions;
      });
    }
      
    $scope.save = function(){
      console.log($scope.contest);
      $http.post('contest/update', {
        contest: $scope.contest,
        questions: $scope.questions,
        header: $scope.header.text
      })
      .success(function(response){
        console.log(response);
      });
    }

    $scope.addNewQuestionFromText = function(){
     $http.post('contest/parseText', {
        text: $scope.textSample
      })
      .success(function(response){
        console.log(response);
      }); 
    }


    $scope.startEdit = function(obj){
      setTimeout(function(){
        obj.edit = true;  
        $scope.$apply();
        $("#" + obj.id + "-edit").trigger('select');
      }, 100);
    };

    $scope.finishEdit = function(obj, callback, callbackArg){
      obj.edit = false;
      if (callback){
        callback(callbackArg);
      }
    };

    $scope.addNewQuestion = function(text){
      var id = ($scope.questions.length + 1).toString();
      $scope.questions.push({
        id: id,
        edit: false,
        text: text,
        currentText: "",
        choices: []
      });
      $scope.currentText = "";
      setTimeout(function(){
        $("#" + id).trigger('select');
      }, 100);
    };

    $scope.deleteQuestion = function(questions, index){
      questions.splice(index, 1);
    };

    $scope.addNewChoice = function(obj, text){
      var id = String.fromCharCode(65 + obj.choices.length);
      console.log(id);
      obj.choices.push({
        edit: true,
        text: text,
        correct: false
      });
      obj.currentText = "";
    };

    $scope.deleteChoice = function(question, index){
      question.choices.splice(index, 1);
    };

    $scope.toggleChoice = function(choice){
      choice.correct = !choice.correct;
    };
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
