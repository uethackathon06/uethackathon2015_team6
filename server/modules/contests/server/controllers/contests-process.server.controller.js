'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contest = mongoose.model('Contest');

exports.mark = function(req, res){
  //console.log(req.body);
  var mark = function(questions, answers){
    var total = questions.length;
    var correct = 0;
    //console.log(answers);
    for(var i = 0; i < questions.length; i++){
      var flag = true;
      for(var j = 0; j < questions[i].choices.length; j++)
        if (questions[i].choices[j].correct != answers[i][j])
          flag = false;
      if (flag)
        correct += 1;
    }

    return {correct: correct, total: total};
  }
  console.log(req.body);
  Contest.findOne({_id: req.body.id}, function(err, contest){
    if (err || !contest){
      res.json("Contest not exists");
      return;
    }
    contest = contest.toObject();

    var result = mark(contest.questions, req.body.answers);
    
    res.json(result);
  }); 
}

//for student, get only question
exports.getcontest = function(req, res){
  //console.log(req.body);
  Contest.findOne({_id: req.body.id}, function(err, contest){
    if (err || !contest || !contest.questions){
      res.json("Contest not exists");
      return;
    }
    contest = contest.toObject();
    for(var i = 0; i < contest.questions.length; i++){
      for(var j = 0; j < contest.questions[i].choices.length; j++){
        contest.questions[i].choices[j].correct = false;
      }
    }
    res.json(contest);
  }); 
}

exports.parseText = function(req, res) {
  var fs = require('fs');

  fs.writeFile("../temp.txt", req.body.text, function(err) {
      if(err) {
          return console.log(err);
      }
  }); 

  setTimeout(function() {
      var process = require("child_process").exec(
      'python ' + '../converter.py',
      function (error, stdout, stderr) {
        if (error) {
          console.log(error.stack);
          console.log('Error code: '+error.code);
          console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDERR: '+stderr);
      }
    );

    process.on("exit", function (code) {
      console.log("spawnEXIT:", code)
    });
  }, 100);

  setTimeout(function() {
    var obj = JSON.parse(fs.readFileSync('../output.txt', 'utf8'));
    res.json(obj);
  }, 100);
}

exports.quizz = function(req, res){
  Contest.find({}, function(err, contests){
    //console.log(contests);
    var arr = [];
    for(var i = 0; i < contests.length; i++){
      if (!err && contests[i] && contests[i].questions){
        //console.log(contests[i].questions);
        for(var j = 0; j < contests[i].questions.length; j++){
          arr.push(contests[i].questions[j]);
        }
      }  
    }
    //console.log(arr);
    res.json(arr[Math.floor((Math.random() * arr.length) + 1)]);
  });
}

