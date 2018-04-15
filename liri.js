//import { twitter } from "./keys";

require("dotenv").config();
var fs = require("fs");
var twitter = require("twitter");
var keys = require('./keys');
//var spotify = new spotify(keys.spotify)
var client = new twitter(keys.twitter);


// commands
var command = process.argv[2];
//console.log("Command is: " +command);
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
    });
}
else if (command === "spotify-this-song"){
    console.log("spotify statement");
}
else if(command === "movie-this"){
    console.log("movies statement");
}
else if(command === "do-what-it-says"){
    console.log("do what it says");
}
else{
    console.log("Please enter a proper command\n > my-tweets \n > spotify-this-song \n > movie-this \n > do-what-it-says\n");
}