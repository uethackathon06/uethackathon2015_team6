'use strict';

/**
 * Module dependencies.
 */
var contest = require('../controllers/contests.server.controller'),
	contestP = require('../controllers/contests-process.server.controller');
module.exports = function (app) {
  app.route('/contest/create')
    .post(contest.create);

  app.route('/contest/list')
    .get(contest.list);
  
  app.route('/contest/find')
    .post(contest.find);

  app.route('/contest/update')
    .post(contest.update);

  app.route('/contest/parsetext')
    .post(contestP.parseText);

  app.route('/contest/get')
    .post(contestP.getcontest);

  app.route('/contest/submit')
    .post(contestP.mark);
};
