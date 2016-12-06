var app = angular.module('myApp', [])

app.controller('myCtrl', function($scope, $http) {
	$scope.recentSearches = [];

	//success callback
	var scb = function(response) {

		//response.data[i].searchfield <-- syntax for accessing searches

		for (i = 0; i < response.data.length; i++) {
			$scope.recentSearches.push(response.data[i]);
		}
    }

    //error callback
    var ecb = function(response) {
        console.log('failed');
    }

	$http.get('/searches').then(scb, ecb);
	
});