app.controller('listController',
  ['$scope', '$location', 'userFactory','$routeParams',

    function($scope, $location, userFactory, $routeParams) {

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
    var getUserById = function(id){
      console.log('getUserById', id);

      userFactory.getUserById(id, function(user){
        $scope.user = user;
      });
    }

    var init = function () {
      console.log('init');
      var id = $routeParams.id;
      getUserById(id);
      // $scope.getBucketAsTaggee();
      // $scope.getBucketAsTagger();
      $scope.getAllBuckets();
    }

    init();

}]);
