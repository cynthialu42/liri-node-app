// File requirements
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var spotify = new Spotify(keys.spotify)
var client = new twitter(keys.twitter);
var request = require('request');

// Gets at most 20 latest tweets of the specified twitter handle
function myTweets(twitterHandle){
    var params = {screen_name: twitterHandle};
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
                console.log("============== " + tweets[i].created_at + " ============== \n");
                console.log(tweets[i].text + " ~" + params.screen_name + "\n");
            } 
            console.log("============================================================");
        }
        else{
            console.log("An error has occured: " + error);
        }
    });
}

// Gets information about the queried song title
function spotifyThisSong(songTitle){
    spotify.search({type: 'track', query: songTitle}, function(error, data){
        if(!error){
            let firstResult = data.tracks.items[0];
            //console.log(firstResult);
            let artistList = "";
            for (let i = 0; i < firstResult.artists.length; i++){
                artistList += firstResult.artists[i].name + "\n";
            }
            console.log("============================================================\n");
            console.log("Artist: " + artistList);
            console.log("Title: " + firstResult.name + "\n");
            if (firstResult.preview_url == null){
                console.log("No Preview, Full Song: " + firstResult.external_urls.spotify + "\n");
            }
            else{
                console.log("Preview Song: " + firstResult.preview_url + "\n");
            }
            console.log("Album Name: " + firstResult.album.name + "\n");
            console.log("\n============================================================");
        }
        else{
            console.log("An error has occured: " + error);
        }
    });
}

// Gets information on the queried movie title
function movieThis(movieName){
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {
        if (!error){
            let JSONBody = JSON.parse(body);
            //console.log(JSON.parse(body).Title);
            console.log("============================================================\n");
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
            console.log("\n============================================================");
    
        }
        else{
            console.log("An error has occured: " + error);
        }
        
    });
}

// Executes the action defined in random.txt
function doWhatItSays(){
    fs.readFile("./random.txt", "utf8", function(error, data){ 
        if (!error){
            var dataArr = data.split(',');
            if (dataArr[0] === "my-tweets"){
                // Need to cut out the quotes to work
                var noQuotes = dataArr[1].substring(1,dataArr[1].length-1);
                myTweets(noQuotes);
            }
            else if (dataArr[0] === "spotify-this-song"){
                spotifyThisSong(dataArr[1]);
            }
            else if (dataArr[0] === "movie-this"){
                movieThis(dataArr[1]);
            }
            else{
                console.log("Nothing to do here!");
            }
        }
        else{
            console.log("An error has occured: " + error);
        }
        
    });
}

// Export these functions so liri.js can use it
module.exports = {
    myTweets,
    spotifyThisSong,
    movieThis,
    doWhatItSays
}