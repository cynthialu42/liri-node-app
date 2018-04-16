//import { twitter } from "./keys";

require("dotenv").config();
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var spotify = new Spotify(keys.spotify)
var client = new twitter(keys.twitter);
var request = require('request');


// commands
var command = process.argv[2];
var songName = process.argv[3];
var movieName = process.argv[3];
//console.log("Command is: " +command);
//console.log(songName);
if (command === "my-tweets"){
    var params = {screen_name: 'sadmayo'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var numOfTweets = 0;

            // If less than 20 tweets, show what's available
            if (tweets.length < 20){
                numOfTweets = tweets.length;
            }
            else{
                numOfTweets = 20;
            }
            for (let i = 0; i < numOfTweets; i++){
                console.log("============== " + tweets[i].created_at + " ============== \n")
                console.log(tweets[0].text + " ~" + params.screen_name + "\n");
            } 
            console.log("============================================================")
        }
        else{
            console.log("An error has occured: " + error);
        }
    });
}
else if (command === "spotify-this-song"){
    spotify.search({type: 'track', query: songName}, function(error, data){
        if(!error){
            let firstResult = data.tracks.items[0];
            //console.log(firstResult);
            let artistList = "";
            for (let i = 0; i < firstResult.artists.length; i++){
                artistList += firstResult.artists[i].name + "\n";
            }
            console.log("Artist: " + artistList);
            console.log("Title: " + firstResult.name);
            console.log("Preview Song: " + firstResult.preview_url);
            console.log("Album Name: " + firstResult.album.name);
            
        }
        else{
            console.log("An error has occured: " + error);
        }
    });
}
else if(command === "movie-this"){
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        //title
        let JSONBody = JSON.parse(body);
        //console.log(JSON.parse(body).Title);
        console.log("Title: " + JSONBody.Title);
        console.log("Year: " + JSONBody.Year);
        //rating imdb
        for (let i = 0; i < JSONBody.Ratings.length; i++){
            if (JSONBody.Ratings[i].Source === "Internet Movie Database"){
                console.log("IMDB Rating: " + JSONBody.Ratings[i].Value);
            }
            else if(JSONBody.Ratings[i].Source === "Rotten Tomatoes"){
                console.log("Rotten Tomatoes Rating: " + JSONBody.Ratings[i].Value);
            }
            else{
                // Do Nothing
            }
        }

        console.log("Country Produced: " + JSONBody.Country);
        console.log("Language: " + JSONBody.Language);
        console.log("Plot: " + JSONBody.Plot);
        console.log("Actors: " + JSONBody.Actors);

    });
}
else if(command === "do-what-it-says"){
    console.log("do what it says");
}
else{
    console.log("Please enter a proper command\n > my-tweets \n > spotify-this-song \n > movie-this \n > do-what-it-says\n");
}