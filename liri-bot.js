// Hide API keys
require("dotenv").config();

//Pull API Keys from keys.js file
const keys = require("./keys.js");

//Store Spotify key into a variable
const Spotify = require("node-spotify-api");
const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

//NPM Module to access OMDB and Bands in Town API
let request = require("request");

//NPM Module to access File System
let fs = require('fs');

//Variable to captue the item user is searching for and replacing spaces with +'s
let nodeArgs = process.argv;
let query = nodeArgs.slice(3).join("+");

// get the user input (concert, movie, or spotify)
const input = process.argv[2];

//make a decision based on the input
switch (input) {
    case "concert-this":
        concertThis()
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("I don't understand, ask Foogle-Bot");
}

//Spotify functon
function spotifyThisSong() {
    let search;
    if (query === "") {
        spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log("Name: " + data.tracks.items[0].artists[0].name)
                console.log("Preview: " + data.tracks.items[0].preview_url)
                console.log("Album: " + data.tracks.items[0].album.name)
            }
        });

    } else {
        spotify.search({ type: 'track', query: query }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log("Name: " + data.tracks.items[0].artists[0].name)
                console.log("Preview: " + data.tracks.items[0].preview_url)
                console.log("Album: " + data.tracks.items[0].album.name)
            }
        });
    }
} // End Spotify function


// Concert this function
function concertThis() {
    request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + keys.apiInfo.bitAPI, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let concertArr = JSON.parse(body);
            if (concertArr.length === 0) {
                console.log("No Concerts Found")

            } else {
                for (let i = 0; i < 5; i++) {
                    console.log("Venue: " + concertArr[i].venue.name);
                    console.log("Location: " + concertArr[i].venue.city);
                    console.log("Date: " + concertArr[i].datetime)
                }
            }
        }
    })
}
// End Concert this function 


// Movie this function
function movieThis() {
    if (query === "") {
        request("http://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=" + keys.apiInfo.omdbAPI, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(response.body))
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        })
    } else {
        request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=" + keys.apiInfo.omdbAPI, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(response.body))
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        })
    }
} //End Movie this function


//Do What it says function, pulls from random.txt file
function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            let dataArr = data.split(',');
            query = dataArr[1];
            spotifyThisSong()
        }
    })
}
//End Do What it says function