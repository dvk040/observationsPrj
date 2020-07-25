var app = angular.module("mymodule", ["ngRoute"]);

app.controller("homecontroller", function ($scope) {
});

app.controller("aboutcontroller", function ($scope) {
});

app.controller("contactcontroller", function ($scope) {
});


app.config(function ($routeProvider) {
    $routeProvider

      .when("/home", {
          templateUrl: "/Home/Home",
          controller: "homecontroller",
      })

      .when("/about", {
          templateUrl: "/Home/About",
          controller: "aboutcontroller"
      })

      .when("/contact", {
          templateUrl: "/Home/Contact",
          controller: "contactcontroller"
      })

      .otherwise({
          redirectTo: "/home"
      });
});
