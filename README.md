# Liri

## Introduction

LIRI: Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in paramters and gives back data.

<br>

## Required NPM Packages
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Request](https://www.npmjs.com/package/request)

     * Request is used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

## Getting Started
1. Clone the repo
2. Run NPM install for all of the above packages
3. Get API keys gets for Spotify, OMDB, and Bands In Town APIs
4. Insert your own API Keys into the "keys.js" file

## Run the Application
### Available Functions
* concert-this: returns data from Bands in Town API about 5 upcoming concerts from the input artist
* movie-this: returns data from OMDB API about input movie
* spotify-this-song: returns data from Spotify API about input song
* do-what-it-says: returns data from parameters that are pulled from a .txt file in the same directory

### Syntax
```
node liri.js <function> <parameter>
```

<br>

Running the following commands into your command line will return the following:
```
node liri.js concert-this <artist>
```
Will return the following data about 5 upcoming concerts:
* Name of the venue
* Venue location
* Date of the event (Moment.js is used to format date

If an artist has no upcoming concerts, "No concerts found" is returned.

<br>

```
node liri.js spotify-this-song <song name>
```
Will return the following data about the input song:
* Artist
* Song Name
* Preview link of the song from Spotify
* Album

If no song is input, the program will default to "The Sign" by Ace of Base 

<br>

```
node liri.js movie-this <movie name>
```
Will return the following data about the movie input:
* Title
* Year
* IMDB Rating
* Rotten Tomatoes Score
* Country
* Language
* Plot
* Actors

If no movie is input, the program will default to the movie "Mr. Nobody"

<br>

```
node liri.js do-what-it-says
```
* The program will take the text from the "random.txt" file and will use the first item to call the appropriate function and use the second item as it's parameter
* Currently, the following is in the "random.txt" file:
```
spotify-this-song,"I Want it That Way"
```
* This will work if you change the "random.txt" file into a movie-this query instead

<br>
All commands and output results are appended to the "log.txt" file

test