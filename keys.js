// console.log('this is loaded');

const spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

const apiInfo = {
    omdbAPI: process.env.OMDB_API,
    bitAPI: process.env.BandsInTown_API
}

module.exports = { spotify, apiInfo }