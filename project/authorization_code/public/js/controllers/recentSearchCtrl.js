var app = angular.module('myApp', [])

app.controller('myCtrl', function($scope, $http) {
	$scope.recentSearches = [];

	var scb = function(response) {
        console.log(response);
        $scope.recentSearches = response.data;
    }

    var ecb = function(response) {
        console.log('failed');
    }

	// var searches = $http.get('/searches').then(scb, ecb);
	// console.log(ecb);
	// var fuck = JSON.stringify(searches);
	// console.log("fuck: " + fuck);
	// console.log("type of searches: " + typeof searches);
	// // searches = JSON.parse(searches);
	// console.log("searches: " + searches[0]);
	// //$scope.recentSearches = $http.get('/searches', {}).then(scb, ecb);



	// $http.get('/searches').then(function successCallback(response) {
	// 	console.log(response);

	// }, function errorCallback(response) {
	// 	console.log("error");
	// });

	$http.get('/searches').then(scb, ecb);
	
});