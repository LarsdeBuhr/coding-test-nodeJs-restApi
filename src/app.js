import path from "path";
import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import randomArtistsList from "../json/randomArtists.json" assert { type: "json" };
import writeToCsv from "./writeToCsv.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create an express application
const app = express();

//Directory for static assets
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//Starts server on environment variable PORT or port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.post("", (req, res) => {
   //getting user input via post-method
   let filenameFromUserInput = encodeURIComponent(req.body.filename) + ".csv";
   let artistFromUserInput = encodeURIComponent(req.body.artist);

   const apiKey = "6ee9913bbcf31aa24cd6b422e2646f6a";
   fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistFromUserInput}&api_key=${apiKey}&format=json`
   )
      .then((response) => response.json())
      .then((dataFromJSON) => {
         //Checking if the artist, the user is looking for, is in the dataset
         let artistInformation =
            dataFromJSON.results.artistmatches.artist.filter(
               (artist) =>
                  encodeURIComponent(artist.name.toLowerCase()) ===
                  artistFromUserInput.toLowerCase()
            );

         let data = null;
         //If the entered artist name is in the JSON file
         if (artistInformation.length > 0) {
            data = {
               name: artistInformation[0].name,
               mbid: artistInformation[0].mbid,
               url: artistInformation[0].url,
               image_small: artistInformation[0].image[0]["#text"],
               image: JSON.stringify(artistInformation[0].image),
            };
         } else {
            //If the entered artist name is not in the JSON file a static JSON file will be used as a fallback. The artist name will be picked randomly
            data =
               randomArtistsList[
                  Math.floor(Math.random() * randomArtistsList.length)
               ];
         }

         //calling the writeToCsv Method with the inputted filename and artist datas
         writeToCsv(filenameFromUserInput, data);
         res.sendFile(path.join(__dirname, "../public/index.html"));
      })
      //Catching errors
      .catch((err) => {
         res.sendFile(path.join(__dirname, "../public/error.html"));
      });
});
