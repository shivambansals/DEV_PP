const cheerio = require("cheerio");
const request = require("request");
const getMatchDetails = require("./match");

 function getAllMatches(allMatchesLink){
     request(allMatchesLink , function(err, res , data){
         processData(data);
     })
 }



 function processData(html){
     let myDocument = cheerio.load(html);
     let allAtag = myDocument('a[data-hover="Scorecard"]');
    // console.log(allAtag.length);
    for(let i = 0; i<allAtag.length; i++){
        let matchLink = "http://www.espncricinfo.com" + myDocument(allAtag[i]).attr("href");
       // console.log(matchLink);
        getMatchDetails(matchLink);
    }
 }


 module.exports = getAllMatches;
