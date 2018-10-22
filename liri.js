require("dotenv").config();

let Keys = require("./keys.js");
let fs = require("fs");
let request = require("request");
let Spotify = require("node-spotify-api");

let spotify = new Spotify(Keys.spotify);

let search = process.argv[2];
let term = process.argv.slice(3).join(" ");

switch (search) {
    case "concert-this":
    console.log("You are searching for a concert");
    concertThis(term);
    break;
    case "spotify-this-song":
    console.log("You are searching for a song");
    spotifySong(term);
    break;
    case "movie-this":
    console.log("you are searching for a movie");
    movieInfo(term);
    break;
    case "do-what-it-says":
    console.log("Do what it says!");
    doIt();
    break;
    default:
    console.log("Please try again");
}

function concertThis(term) {
    let  queryURL = "https://rest.bandsintown.com/artists/"+ term +"/events?app_id=codingbootcamp";
    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let  json = JSON.parse(body);
            for (i = 0; i < json.length; i++) {
                let  showInfo = json[i].datetime;
                let  month = showInfo.substring(5, 7);
                let  year = showInfo.substring(0, 4);
                let  day = showInfo.substring(8, 10);
                let  dateDisplay = month + "/" + day + "/" + year;

                console.log("Searching for " + term + " concert information");
                console.log("\n-----------------------------------\n");
                console.log("Venue: " + json[i].venue.name);
                console.log("City: " + json[i].venue.city);
                console.log("Date: " + dateDisplay);
                console.log("\n-----------------------------------\n");
            }
        }
    })
}

function spotifySong(term) {

    let  searchSong;
    if (term === undefined) {
        searchSong = "Ace of Base The Sign";
    } else {
        searchSong = term;
    }

    spotify.search({
        type: "track",
        query: searchSong
    }, function(error, data) {
        if (error) {
            return console.log("Error Ocurred: " + error);
        }
        else {
            console.log(searchSong);
            console.log("\n-----------------------------------\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[3].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("\n-----------------------------------\n");
        }
    })
}

function movieInfo(term) {

    let  searchMovie;
    if (term === undefined) {
        searchMovie = "Mr. Nobody";
    } else {
        searchMovie = term;
    }

    let  queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        let jsonResponse = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            console.log(searchMovie);
            console.log("\n-----------------------------------\n");
            console.log("Title: " + jsonResponse.Title);
            console.log("Released: " + jsonResponse.Year);
            console.log("IMDB Rating: " + jsonResponse.imdbRating);
            console.log("Rotten Tomatoes Rating: " + jsonResponse.Ratings[1].Value);
            console.log("Country: " + jsonResponse.Country);
            console.log("Language: " + jsonResponse.Language);
            console.log("Plot: " + jsonResponse.Plot);
            console.log("Actors: " + jsonResponse.Actors);
            console.log("\n-----------------------------------\n");
        }
    })
}

function doIt() {
    fs.readFile("random.txt", "UTF-8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        let dataArray = data.split(", ");
        if (dataArray[0] === "spotify-this-song") {
            var savedText = dataArray[1].trim().slice(1, -1);
            spotifySong(savedText);
        } 
    })
}

function saveInfo(dataToLog) {
    console.log(dataToLog);
    fs.appendFile("log.txt", dataToLog + "\n", function(error) {
        if (error) return console.log("Error logging data to file: " + error);
    })
}