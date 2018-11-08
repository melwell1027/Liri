

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

//NPM Module to access moment.js
let moment = require("moment");

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
        fs.appendFile("./log.txt", process.argv, function (err) {
            if (err) {
                console.log(err);
            }
        })
        concertThis()
        break;
    case "spotify-this-song":
        fs.appendFile("./log.txt", process.argv, function (err) {
            if (err) {
                console.log(err);
            }
        })
        spotifyThisSong();
        break
    case "movie-this":
        fs.appendFile("./log.txt", process.argv, function (err) {
            if (err) {
                console.log(err);
            }
        })
        movieThis();
        break;
    case "do-what-it-says":
        fs.appendFile("./log.txt", process.argv, function (err) {
            if (err) {
                console.log(err);
            }
        })
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
                let outputStr = "\n Artist: " + data.tracks.items[0].artists[0].name + "\n Name: " + data.tracks.items[0].name + "\n Preview: " + data.tracks.items[0].preview_url + "\n Album: " + data.tracks.items[0].album.name + "\n";

                console.log(outputStr)

                fs.appendFile("./log.txt", outputStr, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        });

    } else {
        spotify.search({ type: 'track', query: query }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                let outputStr = "\n Artist: " + data.tracks.items[0].artists[0].name + "\n Name: " + data.tracks.items[0].name + "\n Preview: " + data.tracks.items[0].preview_url + "\n Album: " + data.tracks.items[0].album.name + "\n";

                console.log(outputStr)

                fs.appendFile("./log.txt", outputStr, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
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

                fs.appendFile("./log.txt", "\nNo Concerts Found", function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                for (let i = 0; i < 5; i++) {
                    let outputStr = "\n Venue: " + concertArr[i].venue.name + "\n Location: " + concertArr[i].venue.city + "\n Date: " + moment(concertArr[i].datetime).format("MM/DD/YYYY") + "\n";

                    console.log(outputStr);

                    fs.appendFile("./log.txt", outputStr, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
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
                let outputStr = "\n Title: " + JSON.parse(body).Title + "\n Year: " + JSON.parse(body).Year + "\n IMDB Rating: " + JSON.parse(body).imdbRating + "\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n Country: " + JSON.parse(body).Country + "\n Language: " + JSON.parse(body).Language + "\n Plot: " + JSON.parse(body).Plot + "\n Actors: " + JSON.parse(body).Actors + "\n";

                console.log(outputStr);

                fs.appendFile("./log.txt", outputStr, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } else {
        request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=" + keys.apiInfo.omdbAPI, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let outputStr = "\n Title: " + JSON.parse(body).Title + "\n Year: " + JSON.parse(body).Year + "\n IMDB Rating: " + JSON.parse(body).imdbRating + "\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n Country: " + JSON.parse(body).Country + "\n Language: " + JSON.parse(body).Language + "\n Plot: " + JSON.parse(body).Plot + "\n Actors: " + JSON.parse(body).Actors + "\n";

                console.log(outputStr)

                fs.appendFile("./log.txt", outputStr, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
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