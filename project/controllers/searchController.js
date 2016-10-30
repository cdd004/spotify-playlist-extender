var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.userInput = "";
    $scope.response_unpack = "";

    $scope.clearSearch = function() {
    	document.getElementById('jsonResponse').innerHTML = null;
    }

    $scope.performSearch = function(){
    	//format the query so that spaces match the search format
    	var query = $scope.userInput.split('').join('%20');

    	//$http.get("https://accounts.spotify.com/authorize/?client_id=cbfc085ebe724aa4b7191f7065c6b06e&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-private%20user-read-email&state=34fFs29kd09")

    	var call = $http.get('https://api.spotify.com/v1/search?' + 'q=' + $scope.userInput + "&offset=0&limit=10" +  "&type=artist,track")
    	.then(function(response) {

    		console.log(response);
    		//var.data.artists.items[0].name
    		var artists = response.data.artists.items;
    		// console.log(artists);
    		// console.log(artists[0].name)

    		var tracks = response.data.tracks.items;
    		console.log(tracks[0].name)

    		//clear the previous result
    		document.getElementById('jsonResponse').innerHTML = null;
    		for (i = 0; i < artists.length; i++) {
    			document.getElementById('jsonResponse').innerHTML += '<div class="div-conatiner">';
    			document.getElementById('jsonResponse').innerHTML += '<p class="p-name"> Artist: ' + artists[i].name + '</p>';
    			document.getElementById('jsonResponse').innerHTML += '<a href='+artists[i].uri+'>Found Here</a>';
    			document.getElementById('jsonResponse').innerHTML += '</div>';
    		}

    		for (i = 0; i < tracks.length; i++) {
    			document.getElementById('jsonResponse').innerHTML += '<div class="div-conatiner">';
    			document.getElementById('jsonResponse').innerHTML += '<p class="p-name"> Track: ' + tracks[i].name + ' by ' + tracks[i].artists[0].name + '</p>';
    			document.getElementById('jsonResponse').innerHTML += '<a href='+tracks[i].uri+'>Found Here</a>';
    			document.getElementById('jsonResponse').innerHTML += '</div>';
    		}
    	});
    }
});










