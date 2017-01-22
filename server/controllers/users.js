console.log('users controller');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket');

function UsersController(){
  // helpers
  // get user by name
  var getUserByName = function(name) {
    console.log('Logging user as name', name);
    return User.findOne({ name: name });
  }

  var getAllUsers = function() {
    return User.find({});
  }

  // methods
  this.create = function(req, res){
    console.log("inside UsersController create");
    console.log(req.body);
    var name = req.body.name;
    return getUserByName(name)
    .then(function(user){
      if (!user) {
        user = new User({name: name});
        user.save(function(err, result){
          if (err) {
            console.log('Error', err);
            res.json({'error': err});
          } else {
            res.json(result);
          }
        });
      }
    })
    .catch(function(error) {
      console.log('error', error);
    });
  };

  this.index = function(req, res) {
    // get all users
    var users = User.find({}, function(err, users) {
      if (err) {
        console.log('error', err);
      } else {
        res.json(users);
      }

    })
  };

  this.get = function(req, res) {
    var name = req.params.name;
    console.log('this.get name', name);
    getUserByName(name).then(function(user) {
      console.log('user', user);
      res.json(user);
    });
  }

  this.getUserById = function (req, res) {
    var id = req.params.id;
    console.log('this.getUserById', id);
    return User.findById(id, function(err, user) {
      if (err) {
          console.log(err);
      }
      res.json(user);
    });
  }

  this.getAll = function(req, res) {
    console.log('this.getAll');

    getAllUsers().then(function(users) {
      console.log('users', users);
      res.json(users);
    });
  }

}

module.exports = new UsersController();
