# liri-node-app

## About
* Liri Node is a command line app that connects to Twitter, Spotify, and OMDB to return information on latest tweets, music, and movies. 
* It also has the functionality to execute whatever command is present in the random.txt file
* Results are printed in the terminal
* Check out activityLog.txt for a history of your queries

## Commands
### node liri.js my-tweets "twitter handle"
* Replace twitter handle with the twitter handle you'd like to see tweets from
* If that Twitter has less than 20 tweets, it will display all of them and the date/time posted
* Otherwise it will post the latest 20 tweets
* If no twitter handle is specified, it will default to saymayo's Twitter. 
![my-tweets output example](https://github.com/cynthialu42/liri-node-app/blob/master/images/Screen%20Shot%202018-04-17%20at%207.13.22%20PM.png)
#
### node liri.js spotify-this-song "song title"
* Replace song title with a song title
* Returns artist, song title, preview song, and album name
* If no preview is available, it will return a link to the full song on Spotify
* If no song is specified, it will use The Sign
![spotify-this-song output example](https://github.com/cynthialu42/liri-node-app/blob/master/images/Screen%20Shot%202018-04-17%20at%207.14.27%20PM.png)
#
### node liri.js movie-this "movie title"
* Replace movie title with a movie title
* Returns title, year, IMBD rating, Rotten Tomatoes rating, country produced, language, plot, and actors
* If no movie is specified, it will use Mr. Nobody
![movie-this output example](https://github.com/cynthialu42/liri-node-app/blob/master/images/Screen%20Shot%202018-04-17%20at%207.17.50%20PM.png)
#
### node liri.js do-what-it-says
* This will execute whatever command is in random.txt

## Output
### activityLog.txt
* This file will be created when you run your first command
* Following commands will be appended to the file