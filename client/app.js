var app = angular.module('app', ['ngRoute']);

app
.config(function ($routeProvider){
  $routeProvider
  .when('/',
	 {
		// controller: 'loginController',
		templateUrl: "partials/login.html"
  })

  .when('/user/:id',
		{
			templateUrl: "partials/list.html"
		})

  .when('/dashboard',
    {
      // controller: 'loginController',
      templateUrl: "partials/dashboard.html"
    })

  .when('/home',
    {
      templateUrl: "partials/login.html"
    })

  .when('/login',
    {
      templateUrl: "partials/login.html"
    })

  .otherwise('/index',
  	{
  		// controller: 'loginController',
  		templateUrl: "partials/login.html"
  	})
})
.run( function($rootScope, $location) {

  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    console.log('$routeChangeStart');
    console.log('$rootScope.loggedUser:', $rootScope.loggedUser);

    if (!$rootScope.loggedUser) {
      // no logged user, we should be going to #login
      if (next.templateUrl == 'partials/login.html') {
        console.log('already going to #login, no redirect needed');
        // already going to #login, no redirect needed
      } else {
        // not going to #login, we should redirect now
        console.log('// not going to #login, we should redirect now');
        $location.path( "/login" );
      }
    }
  });
})