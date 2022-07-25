import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import json2csv from "json2csv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Write to CSV file
const writeToCsv = async (fileName, data) => {
   // output file in the userFiles folder
   const filename = path.join(__dirname, `../userFiles/${fileName}`);
   let row;
   // If file doesn't exist, new file will be created and artist information with headers will be added
   if (!fs.existsSync(filename)) {
      row = json2csv.parse(data, { header: true, delimiter: ";" });
   } else {
      // If file exists, artist information will be added without headers
      row = json2csv.parse(data, { header: false, delimiter: ";" });
   }

   // Append file function can create new file too.
   fs.appendFileSync(filename, row);
   // Always add new line if file already exists.
   fs.appendFileSync(filename, "\r\n");
};

export default writeToCsv;
