window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(url);
    console.log(params);
    console.log(data);
    //document.getElementById('here').innerHTML = data.business_id;

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		var data = JSON.parse(http.responseText);
            var track = data.similartracks.track[0];
            var tracks = data.similartracks.track.slice(0,5);
            console.log(tracks);

            var HTMLstring = ""

            if (tracks.length == 0) {
                HTMLstring = "No Similar Songs Found :("
            } else {

                HTMLstring += "<table border='1'>\n";
                HTMLstring += "<tr>\n";
                HTMLstring += "<th>Title</th>\n";
                HTMLstring += "<th>Artist</th>\n";
                HTMLstring += "</tr>\n";

                for (var i = 0; i < tracks.length; i++) {
                    HTMLstring += "<tr>\n";
                    HTMLstring += "<td>" + tracks[i].name + "</td>\n";
                    HTMLstring += "<td>" + tracks[i].artist.name + "</td>\n";
                    HTMLstring += "<tr>\n";
                    //Do something
                }

                HTMLstring += "</table>";

            }

            document.getElementById('fmresult').innerHTML += HTMLstring;

    		//document.getElementById('fmresult').innerHTML = track.name + " by " + track.artist.name; 
    	}
    }
    var url = 'http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+data.artist_name+'&track='+data.track_name+'&api_key=f0350f9a208dcf2dbd6e8b1b56d53d22&format=json';
    http.open("GET", url, true);
    http.send();


}

// var url = 'http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=';
// $http.get('http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+name+'&track='+track+'&api_key=f0350f9a208dcf2dbd6e8b1b56d53d22&format=json')
//         .then(function(response) {

//             var data = response.data.similartracks.track[0];

//             $scope.similar_response = data;
//             console.log($scope.similar_response);
//         //     if ($scope.similar_response == undefined) {
//         //         alert("Sorry! No similar song :(")
//         //     } else {
//         //     alert("Similar track: " + $scope.similar_response.name + " by " + $scope.similar_response.artist.name);
//         // }
//         });