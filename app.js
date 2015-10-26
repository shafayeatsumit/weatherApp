var weatherApp = angular.module("weatherApp",["ngRoute","ngResource"]);

weatherApp.config(function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl:"pages/home.html",
			controller:"homeController"
		})
		.when("/forecast",{
			templateUrl:"pages/forecast.html",
			controller:"forecastController"
		})
		.when("/forecast/:days",{
			templateUrl:"pages/forecast.html",
			controller:"forecastController"
		})
});
weatherApp.service("nameService",function(){
	this.name ="Dhaka, BD";
})

weatherApp.controller("homeController",["$scope","nameService",function($scope,nameService){
	$scope.name=nameService.name;
	$scope.$watch("name",function(){
		nameService.name = $scope.name;
	})

}]);

weatherApp.controller("forecastController",["$scope","$resource","$log","$filter","$routeParams","nameService",function($scope,$resource,$log,$filter,$routeParams,nameService){
	$scope.name = nameService.name;
	$scope.days = $routeParams.days || "2";
	$scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
	$scope.result = $scope.weatherApi.get({q:$scope.name,appid:"fb767224872333d9aa1ee5159740827f",units:"metric",cnt: $scope.days});
	$scope.convertToDate= function(dt){
		return new Date(dt*1000)
	}

}]);