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

        //contructs our query to the API. note that limit=10
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

            //display all the artists 
    		for (i = 0; i < artists.length; i++) {
    			document.getElementById('jsonResponse').innerHTML += '<div class="div-conatiner">';
    			document.getElementById('jsonResponse').innerHTML += '<p class="p-name"> Artist: ' + artists[i].name + '</p>';
    			document.getElementById('jsonResponse').innerHTML += '<a href='+artists[i].uri+'>Open in Spotify</a> <br>';
                document.getElementById('jsonResponse').innerHTML += '<a target="_blank" href='+artists[i].external_urls.spotify+'>Open in browser</a>';
    			document.getElementById('jsonResponse').innerHTML += '</div>';
    		}

            //display all the tracks & their respective artists
    		for (i = 0; i < tracks.length; i++) {
    			document.getElementById('jsonResponse').innerHTML += '<div class="div-conatiner">';
    			document.getElementById('jsonResponse').innerHTML += '<p class="p-name"> Track: ' + tracks[i].name + ' by ' + tracks[i].artists[0].name + '</p>';
    			document.getElementById('jsonResponse').innerHTML += '<a href='+tracks[i].uri+'>Open in Spotify</a> <br>';
                document.getElementById('jsonResponse').innerHTML += '<a target="_blank" href='+tracks[i].external_urls.spotify+'>Open in browser</a>';
    			document.getElementById('jsonResponse').innerHTML += '</div>';
    		}
    	});
    }
});










