import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import processUserInput from "./processUserInput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create an express application
const app = express();

//Directory for static assets
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.use(express.urlencoded({ extended: true }));
app.post("", (req, res) => {
   //getting user input via post-method
   processUserInput(req);
   res.sendFile(path.join(__dirname, "../public/index.html"));
});

//Starts server on environment variable PORT or port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
