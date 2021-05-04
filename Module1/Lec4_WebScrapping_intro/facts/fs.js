const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./index.html" , "utf8");
//console.log(htmlKaData);
let myDocuments = cheerio.load(htmlKaData);
 let h1KaData = myDocuments("h1").text();
 console.log(h1KaData);