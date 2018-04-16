// File requirements
require("dotenv").config();
var actions = require("./actions.js");

// Get Command
var command = process.argv[2];

// If no handle defined, use "sadmayo"
if (command === "my-tweets"){
    let twitterHandle = process.argv[3];
    if (twitterHandle == undefined){
        twitterHandle = "sadmayo";
    }
    actions.myTweets(twitterHandle);
}

// If no song defined, use "The Sign"
else if (command === "spotify-this-song"){
    let songName = process.argv[3];
    if (songName == undefined){
        songName = "The Sign";
    }
    actions.spotifyThisSong(songName);
}

// If no movie defined, use "Mr. Nobody"
else if(command === "movie-this"){
    let movieName = process.argv[3];
    if (movieName == undefined){
        movieName = "Mr. Nobody";
    }
    actions.movieThis(movieName);
}

// Execute the doWhatItSays function
else if(command === "do-what-it-says"){
    actions.doWhatItSays();
}

// If no command defined, show help text
else{
    console.log("Please enter a proper command after node liri.js \n > my-tweets \"< twitter handle >\"\n > spotify-this-song \"< song title >\"\n > movie-this \"< movie title >\"\n > do-what-it-says\n");
}