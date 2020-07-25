var app = angular.module("mymodule", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider

      .when("/home", {
          templateUrl: 'home.html',
          controller: 'homecontroller',
      })

      .when("/about", {
          templateUrl: "about.html",
          controller: "aboutcontroller"
      })

      .when('/contact', {
          templateUrl: 'contact.html',
          controller: 'contactcontroller'
      })

	  .when('/register', {
          templateUrl: 'register.html',
          controller: 'registercontroller'
      })

	  .when('/login', {
          templateUrl: 'login.html',
          controller: 'logincontroller'
      })

	  .when('/mainpage', {
          templateUrl: 'mainpage.html',
          controller: 'mainpagecontroller'
      })

      .otherwise({
          redirectTo: "/home"
      });
});

app.controller("homecontroller", function ($scope, $rootScope) {
    
});

app.controller("aboutcontroller", function ($scope, $rootScope) {
    
});

app.controller("contactcontroller", function ($scope, $rootScope) {
    
});

app.controller("registercontroller", function ($scope, $rootScope) {
    
	$scope.user = { "username": "", "password": "", "confirmpassword": "", "phone": "", "email": "" };

	$scope.register = function()
	{

		//get json array from local storage & convert string to json array
		var mydata = JSON.parse(localStorage.getItem("mydata"));

		//if it is empty create a new json array
		if (mydata == "undefined" || mydata == null)
		{
			mydata = [];
		}

		//add object to json array
		mydata.push($scope.user);

		//store json array in the local storage
		localStorage.setItem("mydata", JSON.stringify(mydata));

		//alert("Registered");
		//alert(JSON.stringify(mydata));

		//store current username in session
		sessionStorage.setItem("currentusername", $scope.user.username);

		//go to main page
		window.location = "http://localhost/miniproject/index.html#/mainpage";
	}

});

app.controller("logincontroller", function ($scope, $rootScope) {
    
	$scope.user = { "username": "", "password": "" };

	$scope.login = function()
	{

		//get json array from local storage & convert string to json array
		var mydata = JSON.parse(localStorage.getItem("mydata"));

		//if it is empty create a new json array
		if (mydata == "undefined" || mydata == null)
		{
			mydata = [];
		}

		//check
		var b = false;
		for (i=0; i<mydata.length; i++)
		{
			if (mydata[i].username == $scope.user.username && mydata[i].password == $scope.user.password)
			{
				b = true;
			}
		}

		if (b)
		{
			//store current username in session
			sessionStorage.setItem("currentusername", $scope.user.username);

			//go to main page
			window.location = "http://localhost/miniproject/index.html#/mainpage";
		}
		else
		{
			$scope.errormessage = "Invalid username or password";
		}
		
	}

});

app.controller("mainpagecontroller", function ($scope, $rootScope) {

	$scope.currentusername = sessionStorage.getItem("currentusername");

	$scope.logout = function() {
		
		sessionStorage.setItem("currentusername", "");

		//go to login page
		window.location = "http://localhost/miniproject/index.html#/login";
	};

});
