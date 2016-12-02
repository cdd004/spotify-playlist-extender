var app = angular.module('myApp', []);

//-------------------------------------------
// var express = require('express');
// var mongoose = require('mongoose');
// var Search = require('./models/Search');

// mongoose.connect('mongodb://localhost/spotify-test');
//-------------------------------------------

app.controller('myCtrl', function($scope, $http) {

    $scope.userInput = "";
    $scope.response_unpack = "";
    //$scope.toggle = {switch:true};
    $scope.toggle = true;
    $scope.start = true;

    $scope.toggleStart = function() {
        $scope.start = false;
        console.log('start has been toggled!');
        console.log("$scope.start = " + $scope.start);
    }

    $scope.clearSearch = function() {
    	document.getElementById('jsonResponse').innerHTML = null;
    }

    $scope.performSearch = function(){

        $scope.toggle = !$scope.toggle;
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
    		document.getElementsByClassName('jsonResponse')[0].innerHTML = null;

            var scb = function() {
                console.log('success');
            }

            var ecb = function() {
                console.log('failed');
            }

            var data = $scope.userInput;
            console.log("data = " + data);
            // $http(
            //     url = "/searches/" + data,
            //     method = "POST"
            // ).then(scb,ecb);

            //UNCOMMENT LINE BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            $http.post('/searches', {searchfield: data}).then(scb, ecb);


            //-------storing search in db?

            // var test = new Search({
            //     searchfield: $scope.userInput;
            // });

            // test.save(function(err) {
            //     if(err) throw err;

            //     console.log('searched query stored');
            // });

            // Search.find({}, function(err, searches) {
            //     if(err) throw err;

            //     console.log(searches);
            // });

            //--------------------------

            //display all the artists 
    		for (i = 0; i < artists.length; i++) {
                if (i == 0) {
                    document.getElementsByClassName('jsonResponse')[0].innerHTML += '<h2>Artists</h2>';
                }
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<div class="artistsResponse">';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<p> Artist: ' + artists[i].name + '</p>';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a href='+artists[i].uri+'>Open in Spotify</a> <br>';
                document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a target="_blank" href='+artists[i].external_urls.spotify+'>Open in browser</a>';
                document.getElementsByClassName('jsonResponse')[0].innerHTML += '<br>';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '</div>';
    		}

            //display all the tracks & their respective artists
    		for (i = 0; i < tracks.length; i++) {
                if (i == 0) {
                    document.getElementsByClassName('jsonResponse')[0].innerHTML += '<h2>Tracks</h2>';
                }
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<div>';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<p> Track: ' + tracks[i].name + ' by ' + tracks[i].artists[0].name + '</p>';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a href='+tracks[i].uri+'>Open in Spotify</a> <br>';
                document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a target="_blank" href='+tracks[i].external_urls.spotify+'>Open in browser</a>';
                document.getElementsByClassName('jsonResponse')[0].innerHTML += '<br>';
    			document.getElementsByClassName('jsonResponse')[0].innerHTML += '</div>';
    		}
    	});
    }
});










