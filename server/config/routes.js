var path = require('path');
var buckets = require('./../controllers/buckets.js');
var users = require('./../controllers/users.js');

module.exports = function(app) {
  app.post('/users', users.create);
  app.get('/users', users.getAll);
  app.get('/users/:name', users.get);

  app.get('/user/:id', users.getUserById);

  app.post('/buckets', buckets.create);
  app.get('/buckets/:id', buckets.toggle);
  app.get('/buckets', buckets.get);



  // app.get('/questions', questions.index);
  // app.get('/questions/:id', questions.show);
  // app.post('/answers/:id', answers.create);
  // app.put('/answers/:id',answers.update);
}
