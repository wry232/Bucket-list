// this talks to database
app.factory("userFactory", function($http) {
  // factory
  var factory = {};

  var user;
  var users = [];
  var bucket = {};

  // helper functions
  var findUserByName = function (name, callback) {
    return $http.get('/users/' + name, {
      name: name
    })
    .then(function(result) {
      console.log('result', result);
      if (typeof(callback) === 'function') {
        callback(result.data);
      }
    }, function(error){
      console.log('error', error);

    });
  }

  var createUserByName = function(name, callback) {
    return $http.post('/users', {
      name: name
    })
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  var getAllUser = function(callback) {
    return $http.get('/users')
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  var createBucketByName = function(bucket, callback) {
    return $http.post('/buckets', {
      bucket: bucket
    })
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  // methods
  factory.loginByUserName = function(name, callback) {
    findUserByName(name, function(existUser) {
      if (existUser) {
        console.log("factory found user:", existUser);
        user = existUser;
        callback(user);
      } else {
        console.log("factory user not found");
        createUserByName(name, function(newUser) {
          user = newUser;
          callback(user);
        });
      }
    });
  }

  factory.getUser = function(callback) {
    if (user) {
      callback(user);
    }

    return user;
  }

  factory.getUsers = function(callback) {
    getAllUser(function(users) {
      if (users) {
        callback(users);
      }
      return users || [];
    })

    return [];
  }

  factory.createBucketByName = function(bucket, callback) {
    createBucketByName(bucket, function(savedBucket) {
      callback(savedBucket);
    })
  }

  factory.getBucketAsTagger = function(name, callback) {
    return $http.get('/buckets/?tagger=' + name)
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  factory.getBucketAsTaggee = function(name, callback) {
    return $http.get('/buckets/?taggee=' + name)
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  factory.getAllBuckets = function(name, callback) {
    return $http.get('/buckets/')
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  factory.getUserById = function(id, callback) {
    return $http.get('/user/'+id)
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }

  factory.toggleStateOfBucket = function(bucket, callback) {
    return $http.get('/buckets/'+bucket._id)
    .then(function(result) {
      console.log('result', result);

      if (typeof(callback) === 'function') {
        console.log('result', result);
        callback(result.data);
      }
    });
  }


  return factory;
});
