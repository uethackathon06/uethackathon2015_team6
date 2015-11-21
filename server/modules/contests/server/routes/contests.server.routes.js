'use strict';

/**
 * Module dependencies.
 */
var contest = require('../controllers/contests.server.controller');

module.exports = function (app) {
  app.route('/contest/create')
    .post(contest.create);

  app.route('/contest/list')
    .get(contest.list);
  
  app.route('/contest/find')
    .post(contest.find);

  app.route('/contest/update')
    .post(contest.update);
};
