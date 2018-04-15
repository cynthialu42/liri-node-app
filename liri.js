//import { twitter } from "./keys";

require("dotenv").config();
var fs = require("fs");
var twitter = require("twitter");
var keys = require('./keys');
//var spotify = new spotify(keys.spotify)
var client = new twitter(keys.twitter);


// commands
var command = process.argv[2];

var params = {screen_name: 'sadmayo'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets[0].text);
    }
  });