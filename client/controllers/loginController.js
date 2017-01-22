app.controller("loginController", function($rootScope, $scope, $location, $routeParams, userFactory) {

  // declare user by name
  // $scope.name;

  $scope.loginUserByName = function(){
    console.log('loginUserByName');
    var name = $scope.name;
    if (name) {
      try {
        userFactory.loginByUserName(name, function(user) {
          console.log('callback called');
          $rootScope.loggedUser = true;
          $rootScope.user = user;
          $location.url('/dashboard');
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  $scope.goToDashboard = function() {
    $location.url('/dashboard');
  }

  var init = function() {
    console.log('init loginController');
    $scope.loginUserByName();
  }

  init();

});
