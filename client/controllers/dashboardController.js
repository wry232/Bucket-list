app.controller('dashboardController',
  ['$rootScope', '$scope', '$location', 'userFactory','$routeParams',

    function($rootScope, $scope, $location, userFactory, $routeParams) {

    var getUser = function(){
      if (!$scope.user) {
        userFactory.getUser(function(user){
          $scope.user = user;
        });
      }
    }

    var getUsers = function() {
      if (!$scope.users) {
        userFactory.getUsers(function(users){
          $scope.users = users;
        });
      }
    }

    var saveNewBucket = function(newBucket, callback) {
      userFactory.createBucketByName(newBucket, function(){
        console.log('reset newBucket value');
        $scope.newBucket = {};
        callback();
      });
    }

    $scope.createNewBucket = function() {
      console.log('$scope.newBucket', $scope.newBucket);
      console.log('$scope.user', $scope.user);
      console.log('$scope.taggee', $scope.taggee);

      // TODO: validation
      // check 5 characters
      // check taggee is available or not

      var newBucket = angular.extend({}, {
        tagger: $scope.user,
        taggee: $scope.taggee,
      }, $scope.newBucket);

      saveNewBucket(newBucket, function() {
        $scope.getAllBuckets();
      });
    }

    $scope.removeUserSelf = function(user) {
      return $scope.user.name !== user.name;
    }

    $scope.goToUser = function (user) {
      console.log('$scope.goToUser');
      var url = '/user/' + user._id;
      $location.url(url);
    };


    $scope.getBucketAsTagger = function() {
      var tagger = $scope.user;
      userFactory.getBucketAsTagger(tagger.name, function(buckets) {
        $scope.buckets1 = buckets;
      })
    }

    $scope.getBucketAsTaggee = function() {
      var taggee = $scope.user;
      userFactory.getBucketAsTaggee(taggee.name, function(buckets) {
        $scope.buckets2 = buckets;
      })
    }

    $scope.getAllBuckets = function() {
      var taggee = $scope.user;
      userFactory.getAllBuckets(taggee.name, function(buckets) {
        $scope.buckets1 = buckets.filter(function(bucket){
          return bucket.tagger && bucket.tagger === $scope.user._id;
        })

        $scope.buckets2 = buckets.filter(function(bucket){
          return bucket.taggee && bucket.taggee === $scope.user._id;
        })
      })
    }

    $scope.toggleStateOfBucket = function(bucket) {
      console.log('bucket', bucket);
      userFactory.toggleStateOfBucket(bucket, function(bucket) {
        console.log('returned bucket', bucket);
      });
    }

    var init = function () {
      console.log('init');
      getUser();
      getUsers();
      // $scope.getBucketAsTaggee();
      // $scope.getBucketAsTagger();
      $scope.getAllBuckets();
    }

    init();

}]);
