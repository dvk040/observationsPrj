var app = angular.module("mymodule", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider

      .when("/allcountries", {
          templateUrl: "/Home/allcountries",
          controller: "AllCountriesController",
      })

      .when("/:CountryName", {
          templateUrl: "/Home/countrydetails",
          controller: "CountryDetailsController"
      })

      .otherwise({
          redirectTo: "/allcountries"
      });
});

app.controller("AllCountriesController", function ($scope, $http) {
    $http.get("/api/Countries").success(function (data) {
        $scope.myCountries = data;
    });
});

app.controller("CountryDetailsController", function ($scope, $http, $routeParams) {
    $scope.x = $routeParams.CountryName;
    $http.get("/api/Countries").success(function (data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].CountryName == $routeParams.CountryName) {
                $scope.y = data[i].Population;
                $scope.z = data[i].FlagURL;
            }
        }
    });

});
