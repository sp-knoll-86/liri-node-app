require("dotenv").config();

var Music = require("./keys.js");

process.argv.splice(0, 2);

var search = process.argv[0];
var term = process.argv.join(" ");

if (!search) {
    search = "spotify-this-song";
}

if (!term) {
    term = "I want it that way";
}

switch (search) {
    case "concert-this":
    console.log("You are searching for a concert");
    break;
    case "spotify-this-song":
    console.log("You are searching for a song");
    break;
    case "movie-this":
    console.log("you are searching for a movie");
    break;
    case "do-what-it-says":
    console.log("Do what it says!");
    break;
    default:
    console.log("Please try again");
}