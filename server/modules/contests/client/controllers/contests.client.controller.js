'use strict';

// contests controller
angular.module('contests').controller('contestsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'ContestService',
  function ($scope, $stateParams, $location, $http, Authentication, ContestService) {
    $scope.authentication = Authentication;

    if ($location.path() == '/create'){
      $http.post('contest/create').success(function(response){
        $location.path('/edit/'+response._id);
      })
    }

    $scope.header = {
      id: "header",
      edit: false,
      text: ""  
    };
    $scope.questions = [];
    $scope.currentText = "";

    $scope.textSample = "";
    $scope.chr = [];

    for (var i = 0; i < 26; i++){
      $scope.chr.push(String.fromCharCode(65 + i));
    }
    
    //date control
    $(document).ready(function(){
    $(function () {
      $('#startDate').attr('readonly', 'readonly')
      $('#startDate').datetimepicker();
      $('#endDate').attr('readonly', 'readonly')
      $('#endDate').datetimepicker();
      $("#startDate").on("dp.change",function (e) {
            $('#endDate').data("DateTimePicker").setMinDate(e.date);
            $scope.contest.dateStart = new Date($("#startDate").val());
      });
      $("#endDate").on("dp.change",function (e) {
            $('#startDate').data("DateTimePicker").setMaxDate(e.date);
            $scope.contest.dateEnd = new Date($("#endDate").val());
      });
    });  
    })


    $scope.init = function(){
      var id = $location.path().slice(6);
      
      $http.post('contest/find', {id: id}).success(function(response){
        $scope.contest = response[0];
        $scope.header.text = response[0].header;

        if (response[0].questions)
          $scope.questions = response[0].questions;

        for(var i = 0; i < $scope.questions.length; i++){
          $scope.questions[i].edit = false;
          var choices = $scope.questions[i].choices;
          for(var j = 0; j < choices.length; j ++)
            choices[j].edit = false;
        }

        if ($scope.contest.setTime){
          var dateStart = new Date($scope.contest.dateStart),
              dateEnd = new Date($scope.contest.dateEnd);
          
          $('#startDate').data('DateTimePicker').setDate(dateStart);
          $('#endDate').data('DateTimePicker').setDate(dateEnd);

        }
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
     $http.post('contest/parsetext', {
        text: $scope.textSample
      })
      .success(function(response){
        console.log(response);
        for(var i = 0; i < response.length; i++){
          var id = ($scope.questions.length + 1).toString();
          var question = {
            id: id,
            edit: false,
            text: response[i].question,
            currentText: "",
            choices: []
          };
          
          for(var j = 0; j < response[i].answer.length; j++){
            question.choices.push({
              edit: false,
              text: response[i].answer[j],
              correct: false
            })
          }

          $scope.questions.push(question);
        }
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
        edit: false,
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

    $scope.download = function(){
      $http.post('/contest/savefile', $scope.contest).
      success(function(response){
        //$http.get('/contest/savefile');
        //$window.open('/download');
        window.location.href = '/contest/savefile';
      })
    }

    $scope.shuffle = function(){
      //var newObject = jQuery.extend(true, {}, oldObject);
      var shuffle = ContestService.createShuffle($scope.questions);
      $scope.questions = shuffle.arr;
      console.log($scope.questions);
    }
  }
]);
