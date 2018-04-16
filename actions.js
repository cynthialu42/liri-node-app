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

            let tweetOutput = "";
            tweetOutput += "========================= My-Tweets ========================\n";
            for (let i = 0; i < numOfTweets; i++){
                //console.log("-------------- " + tweets[i].created_at + " -------------- \n");
                console.log(tweets[i].text + " ~" + params.screen_name + "\n");
                tweetOutput += "\n-------------- " + tweets[i].created_at + " -------------- \n\n"
                    + tweets[i].text + " ~" + params.screen_name + "\n";
            } 
            tweetOutput += "\n============================================================\n";
            console.log(tweetOutput);
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
            let artistList = "";
            let songOutput = "";
            for (let i = 0; i < firstResult.artists.length; i++){
                artistList += firstResult.artists[i].name + "\n";
            }
            songOutput += "==================== Spotify-This-Song =====================\n";
            songOutput += "Artist: " + artistList + "\n"
                + "Title: " + firstResult.name + "\n";
            //console.log("Title: " + firstResult.name + "\n");
            if (firstResult.preview_url == null){
                //console.log("No Preview, Full Song: " + firstResult.external_urls.spotify + "\n");
                songOutput += "No Preview, Full Song: " + firstResult.external_urls.spotify + "\n";
            }
            else{
                //console.log("Preview Song: " + firstResult.preview_url + "\n");
                songOutput += "Preview Song: " + firstResult.preview_url + "\n"
            }
            songOutput += "Album Name: " + firstResult.album.name + "\n";
            songOutput += "\n============================================================\n";
            console.log(songOutput);
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
            let movieOutput = "";
            movieOutput += "======================== Movie-This ========================\n";
            movieOutput += "\nTitle: " + JSONBody.Title + "\nYear: "+ JSONBody.Year + "\n";
            
            for (let i = 0; i < JSONBody.Ratings.length; i++){
                if (JSONBody.Ratings[i].Source === "Internet Movie Database"){
                    movieOutput += "IMDB Rating: " + JSONBody.Ratings[i].Value + "\n";
                }
                else if(JSONBody.Ratings[i].Source === "Rotten Tomatoes"){
                    movieOutput += "Rotten Tomatoes Rating: " + JSONBody.Ratings[i].Value  + "\n";
                }
                else{
                    // Do Nothing
                }
            }
            movieOutput += "Country Produced: " + JSONBody.Country + "\n"
                + "Language: " + JSONBody.Language + "\n"
                + "Plot: " + JSONBody.Plot + "\n"
                + "Actors: " + JSONBody.Actors + "\n"
                + "\n============================================================\n"
            console.log(movieOutput);
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