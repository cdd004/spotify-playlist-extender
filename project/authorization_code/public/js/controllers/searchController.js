var app = angular.module('myApp', [])
    .config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|spotify):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

//-------------------------------------------
// var express = require('express');
// var mongoose = require('mongoose');
// var Search = require('./models/Search');

// mongoose.connect('mongodb://localhost/spotify-test');
//-------------------------------------------

app.controller('myCtrl', function($scope, $http, $compile) {

    $scope.userInput = "";
    $scope.response_unpack = "";
    //$scope.toggle = {switch:true};
    $scope.toggle = true;
    $scope.start = true;
    $scope.similar_response = 1;
    $scope.artists = [];
    $scope.tracks = [];

    $scope.toggleStart = function() {
        $scope.start = false;
        console.log('start has been toggled!');
        console.log("$scope.start = " + $scope.start);
    }

    $scope.getSimilar = function(track, name, id) {
        console.log('calling getSimilar()');
        $http.get('http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+name+'&track='+track+'&api_key=f0350f9a208dcf2dbd6e8b1b56d53d22&format=json')
        .then(function(response) {

            $scope.similar_response = response.data.similartracks.track[0];
            //alert("Similar track: " + $scope.similar_response.name + " by " + $scope.similar_response.artist.name);
        });
        var popup = document.getElementById(id);
        popup.classList.toggle('show');
        console.log('finished getSimilar()');
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
    		//var artists = response.data.artists.items;
            $scope.artists = response.data.artists.items;

    		//var tracks = response.data.tracks.items;
            $scope.tracks = response.data.tracks.items;
    		//console.log(tracks[0].name)

    		//clear the previous result
    		document.getElementsByClassName('jsonResponse').innerHTML = null;

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
    		// for (i = 0; i < artists.length; i++) {
      //           if (i == 0) {
      //               document.getElementsByClassName('jsonResponse')[0].innerHTML += '<h2>Artists</h2>';
      //           }
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<div class="artistsResponse">';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<p> Artist: ' + artists[i].name + '</p>';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a href='+artists[i].uri+'> <img src="../../../images/spotify-link.png" width="25px" height="25px"> </a>';
      //           document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a target="_blank" href='+artists[i].external_urls.spotify+'> <img src="../../../images/browser-link.png" width="25px" height="25px"> </a>';
      //           document.getElementsByClassName('jsonResponse')[0].innerHTML += '<br>';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '</div>';
    		// }

            //display all the tracks & their respective artists
    		// for (i = 0; i < tracks.length; i++) {
      //           if (i == 0) {
      //               document.getElementsByClassName('jsonResponse')[0].innerHTML += '<h2>Tracks</h2>';
      //           }
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<div>';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<p> Track: ' + tracks[i].name + ' by ' + tracks[i].artists[0].name + '</p>';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a href='+tracks[i].uri+'> <img src="../../../images/spotify-link.png" width="25px" height="25px"> </a>';
      //           document.getElementsByClassName('jsonResponse')[0].innerHTML += '<a target="_blank" href='+tracks[i].external_urls.spotify+'> <img src="../../../images/browser-link.png" width="25px" height="25px"> </a>';
      //           document.getElementsByClassName('jsonResponse')[0].innerHTML += '<button ng-click="getSimilar()"> <img src="../../../images/similar-link.png" width="25px" height="25px"> </button>';
      //           document.getElementsByClassName('jsonResponse')[0].innerHTML += '<br>';
    		// 	document.getElementsByClassName('jsonResponse')[0].innerHTML += '</div>';

    		// }
    	});
    }
});










